import { useState, type ChangeEvent } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Edit,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  ArrowUpDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import apiClient from '@/lib/api-client'
import { resolveImageUrl } from '@/lib/resolve-image-url'

export interface BannerItem {
  id: number
  label: string
  title: string
  title_line2: string
  subtitle: string
  subtitle_highlight: string
  primary_btn_text: string
  primary_btn_link: string
  secondary_btn_text: string
  secondary_btn_link: string
  image_url: string
  bg_color: string
  sort_order: number
  is_active: number | boolean
}

type BannerForm = {
  id?: number
  label: string
  title: string
  title_line2: string
  subtitle: string
  subtitle_highlight: string
  primary_btn_text: string
  primary_btn_link: string
  secondary_btn_text: string
  secondary_btn_link: string
  image_url: string
  bg_color: string
  sort_order: number
  is_active: boolean
}

const emptyForm: BannerForm = {
  label: '',
  title: '',
  title_line2: '',
  subtitle: '',
  subtitle_highlight: '',
  primary_btn_text: 'SHOP NOW',
  primary_btn_link: '/products',
  secondary_btn_text: 'VIEW ALL',
  secondary_btn_link: '/products',
  image_url: '',
  bg_color: '#f8f9fa',
  sort_order: 1,
  is_active: true,
}

const COLOR_PRESETS = [
  { label: 'Off-White', value: '#f8f9fa' },
  { label: 'Soft Blue', value: '#f0f4ff' },
  { label: 'Warm Cream', value: '#fff8f0' },
  { label: 'Light Mint', value: '#f0fdf4' },
  { label: 'Soft Rose', value: '#fff1f2' },
  { label: 'Lavender', value: '#f5f3ff' },
  { label: 'Dark Navy', value: '#0f172a' },
]

export function Banners() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [formData, setFormData] = useState<BannerForm>(emptyForm)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch banners from API
  const { data: banners = [], isLoading } = useQuery<BannerItem[]>({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await apiClient.get('/banners')
      return Array.isArray(res.data) ? res.data : []
    },
  })

  const openCreateDialog = () => {
    setFormData({
      ...emptyForm,
      sort_order: banners.length + 1,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (banner: BannerItem) => {
    setFormData({
      id: banner.id,
      label: banner.label || '',
      title: banner.title || '',
      title_line2: banner.title_line2 || '',
      subtitle: banner.subtitle || '',
      subtitle_highlight: banner.subtitle_highlight || '',
      primary_btn_text: banner.primary_btn_text || 'SHOP NOW',
      primary_btn_link: banner.primary_btn_link || '/products',
      secondary_btn_text: banner.secondary_btn_text || 'VIEW ALL',
      secondary_btn_link: banner.secondary_btn_link || '/products',
      image_url: banner.image_url || '',
      bg_color: banner.bg_color || '#f8f9fa',
      sort_order: Number(banner.sort_order) || 1,
      is_active: Boolean(Number(banner.is_active)),
    })
    setIsDialogOpen(true)
  }

  // Handle local file upload
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const data = new FormData()
      data.append('image', file)
      const res = await apiClient.post('/uploads/banners', data)
      if (res.data?.image) {
        setFormData((prev) => ({ ...prev, image_url: res.data.image }))
        toast.success('Banner image uploaded successfully!')
      } else {
        toast.error('Could not upload image')
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Image upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Save banner (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        ...formData,
        is_active: formData.is_active ? 1 : 0,
      }

      if (formData.id) {
        await apiClient.put(`/banners/${formData.id}`, payload)
        toast.success('Hero banner updated successfully!')
      } else {
        await apiClient.post('/banners', payload)
        toast.success('New hero banner created!')
      }

      queryClient.invalidateQueries({ queryKey: ['banners'] })
      setIsDialogOpen(false)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save banner')
    } finally {
      setIsSaving(false)
    }
  }

  // Toggle active switch directly from the table
  const handleToggleActive = async (banner: BannerItem) => {
    const currentActive = Boolean(Number(banner.is_active))
    const updatedStatus = !currentActive
    try {
      await apiClient.put(`/banners/${banner.id}`, {
        ...banner,
        is_active: updatedStatus ? 1 : 0,
      })
      toast.success(
        `Banner ${updatedStatus ? 'enabled' : 'hidden'} on homepage`
      )
      queryClient.invalidateQueries({ queryKey: ['banners'] })
    } catch {
      toast.error('Failed to update banner status')
    }
  }

  // Delete banner
  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/banners/${id}`)
      toast.success('Banner deleted')
      queryClient.invalidateQueries({ queryKey: ['banners'] })
    } catch {
      toast.error('Failed to delete banner')
    } finally {
      setDeleteConfirmId(null)
    }
  }

  return (
    <>
      <Header fixed>
        <div className='flex items-center gap-2 px-4'>
          <h1 className='text-lg font-semibold tracking-tight'>Hero Banners</h1>
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Hero Banner Slider
            </h2>
            <p className='text-sm text-muted-foreground'>
              Manage the images, titles, promotional text, and links shown in
              the main homepage hero slider.
            </p>
          </div>
          <Button onClick={openCreateDialog} className='gap-2'>
            <Plus className='h-4 w-4' />
            Add New Banner
          </Button>
        </div>

        {/* Banners List */}
        {isLoading ? (
          <div className='flex h-48 items-center justify-center text-muted-foreground'>
            Loading banners...
          </div>
        ) : banners.length === 0 ? (
          <Card className='border-dashed'>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
                <ImageIcon className='h-6 w-6 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-medium'>No hero banners found</h3>
              <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
                Add your first promotional hero banner to showcase products and
                deals on the homepage.
              </p>
              <Button onClick={openCreateDialog} className='mt-4 gap-2'>
                <Plus className='h-4 w-4' />
                Create Banner
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
            {banners.map((banner) => {
              const isActive = Boolean(Number(banner.is_active))
              return (
                <Card
                  key={banner.id}
                  className={`overflow-hidden border transition-all ${
                    isActive
                      ? 'border-border shadow-sm'
                      : 'border-border/50 opacity-70 bg-muted/20'
                  }`}
                >
                  {/* Top Preview Bar */}
                  <div
                    className='relative flex h-48 items-center justify-between overflow-hidden p-6'
                    style={{ backgroundColor: banner.bg_color || '#f8f9fa' }}
                  >
                    <div className='z-10 max-w-[60%] space-y-1'>
                      {banner.label && (
                        <span className='inline-block rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-800'>
                          {banner.label}
                        </span>
                      )}
                      <h4 className='text-lg font-bold leading-tight text-gray-950'>
                        {banner.title}{' '}
                        <span className='text-primary'>
                          {banner.title_line2}
                        </span>
                      </h4>
                      {banner.subtitle && (
                        <p className='line-clamp-2 text-xs text-gray-600'>
                          {banner.subtitle}{' '}
                          <span className='font-semibold text-gray-900'>
                            {banner.subtitle_highlight}
                          </span>
                        </p>
                      )}
                      <div className='flex gap-2 pt-2'>
                        <span className='rounded bg-gray-900 px-2.5 py-1 text-[10px] font-semibold text-white'>
                          {banner.primary_btn_text || 'SHOP NOW'}
                        </span>
                        {banner.secondary_btn_text && (
                          <span className='rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-medium text-gray-700'>
                            {banner.secondary_btn_text}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className='relative z-10 flex h-36 w-36 items-center justify-center'>
                      {banner.image_url ? (
                        <img
                          src={resolveImageUrl(banner.image_url)}
                          alt={banner.title}
                          className='max-h-full max-w-full object-contain drop-shadow-md'
                          onError={(e) => {
                            ;(e.target as HTMLElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className='flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-gray-400 text-gray-400'>
                          <ImageIcon className='h-8 w-8' />
                        </div>
                      )}
                    </div>

                    {/* Background Pattern Hint */}
                    <div className='absolute -right-8 -top-8 h-32 w-32 rounded-full bg-black/5 blur-2xl pointer-events-none' />
                  </div>

                  {/* Banner Card Footer Details & Controls */}
                  <CardContent className='flex items-center justify-between border-t bg-card p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center gap-2'>
                        <Switch
                          checked={isActive}
                          onCheckedChange={() => handleToggleActive(banner)}
                        />
                        <span className='text-xs font-medium text-muted-foreground'>
                          {isActive ? (
                            <Badge
                              variant='secondary'
                              className='bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 border-0 text-[11px]'
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant='outline'
                              className='text-muted-foreground text-[11px]'
                            >
                              Hidden
                            </Badge>
                          )}
                        </span>
                      </div>
                      <span className='flex items-center gap-1 text-xs text-muted-foreground border-l pl-3'>
                        <ArrowUpDown className='h-3.5 w-3.5' />
                        Order: {banner.sort_order}
                      </span>
                    </div>

                    <div className='flex items-center gap-1.5'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => openEditDialog(banner)}
                        className='h-8 gap-1 text-xs'
                      >
                        <Edit className='h-3.5 w-3.5' />
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setDeleteConfirmId(banner.id)}
                        className='h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive'
                      >
                        <Trash2 className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Add / Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
            <DialogHeader>
              <DialogTitle>
                {formData.id ? 'Edit Hero Banner' : 'Create New Hero Banner'}
              </DialogTitle>
              <DialogDescription>
                Customize banner visuals, headings, action buttons, and image.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSave} className='space-y-4 pt-2'>
              {/* Image Section */}
              <div className='rounded-lg border bg-muted/30 p-4 space-y-3'>
                <Label className='font-semibold flex items-center justify-between'>
                  <span>Banner Image</span>
                  {formData.image_url && (
                    <span className='text-xs text-emerald-600 font-normal flex items-center gap-1'>
                      <Check className='h-3 w-3' /> Image selected
                    </span>
                  )}
                </Label>

                {/* Preview Thumbnail */}
                <div className='flex items-center gap-4'>
                  <div
                    className='relative flex h-24 w-28 shrink-0 items-center justify-center rounded-md border overflow-hidden'
                    style={{ backgroundColor: formData.bg_color || '#f8f9fa' }}
                  >
                    {formData.image_url ? (
                      <img
                        src={resolveImageUrl(formData.image_url)}
                        alt='Preview'
                        className='max-h-full max-w-full object-contain p-1'
                      />
                    ) : (
                      <ImageIcon className='h-8 w-8 text-muted-foreground/40' />
                    )}
                  </div>

                  <div className='flex-1 space-y-2'>
                    {/* Upload Button */}
                    <div className='flex items-center gap-2'>
                      <label className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow transition hover:bg-primary/90'>
                        <Upload className='h-3.5 w-3.5' />
                        {isUploading ? 'Uploading...' : 'Upload Image File'}
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          disabled={isUploading}
                          onChange={handleFileUpload}
                        />
                      </label>
                      <span className='text-xs text-muted-foreground'>
                        PNG, JPG, WEBP (transparent recommended)
                      </span>
                    </div>

                    {/* Or URL input */}
                    <div className='space-y-1'>
                      <Input
                        placeholder='Or paste image URL (https://... or /uploads/...)'
                        value={formData.image_url}
                        onChange={(e) =>
                          setFormData({ ...formData, image_url: e.target.value })
                        }
                        className='h-8 text-xs'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline / Label */}
              <div className='space-y-1.5'>
                <Label htmlFor='label'>Banner Label / Top Tagline</Label>
                <Input
                  id='label'
                  placeholder='e.g. A.I MOBILE ACCESSORIES or SPECIAL OFFER'
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>

              {/* Title Grid */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-1.5'>
                  <Label htmlFor='title'>Main Title (Line 1) *</Label>
                  <Input
                    id='title'
                    required
                    placeholder='e.g. Premium Mobile'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='title_line2'>Title Highlight (Line 2)</Label>
                  <Input
                    id='title_line2'
                    placeholder='e.g. Accessories or In Style'
                    value={formData.title_line2}
                    onChange={(e) =>
                      setFormData({ ...formData, title_line2: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Subtitle Grid */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-1.5'>
                  <Label htmlFor='subtitle'>Subtitle</Label>
                  <Input
                    id='subtitle'
                    placeholder='e.g. Chargers, covers, cables —'
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='subtitle_highlight'>
                    Subtitle Highlight Text
                  </Label>
                  <Input
                    id='subtitle_highlight'
                    placeholder='e.g. best quality at unbeatable prices.'
                    value={formData.subtitle_highlight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subtitle_highlight: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Buttons Grid */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='rounded-lg border p-3 space-y-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Primary Button
                  </span>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Button Text</Label>
                    <Input
                      placeholder='SHOP NOW'
                      value={formData.primary_btn_text}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primary_btn_text: e.target.value,
                        })
                      }
                      className='h-8 text-xs'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Button Link</Label>
                    <Input
                      placeholder='/products or /products?category=chargers'
                      value={formData.primary_btn_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primary_btn_link: e.target.value,
                        })
                      }
                      className='h-8 text-xs'
                    />
                  </div>
                </div>

                <div className='rounded-lg border p-3 space-y-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Secondary Button (Optional)
                  </span>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Button Text</Label>
                    <Input
                      placeholder='VIEW ALL or EXPLORE'
                      value={formData.secondary_btn_text}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondary_btn_text: e.target.value,
                        })
                      }
                      className='h-8 text-xs'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Button Link</Label>
                    <Input
                      placeholder='/products'
                      value={formData.secondary_btn_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondary_btn_link: e.target.value,
                        })
                      }
                      className='h-8 text-xs'
                    />
                  </div>
                </div>
              </div>

              {/* Background Color & Sort Order */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Background Color</Label>
                  <div className='flex items-center gap-2'>
                    <input
                      type='color'
                      value={formData.bg_color}
                      onChange={(e) =>
                        setFormData({ ...formData, bg_color: e.target.value })
                      }
                      className='h-8 w-10 cursor-pointer rounded border p-0'
                    />
                    <Input
                      value={formData.bg_color}
                      onChange={(e) =>
                        setFormData({ ...formData, bg_color: e.target.value })
                      }
                      placeholder='#f8f9fa'
                      className='h-8 flex-1 text-xs'
                    />
                  </div>
                  {/* Presets */}
                  <div className='flex flex-wrap gap-1.5 pt-1'>
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.value}
                        type='button'
                        onClick={() =>
                          setFormData({ ...formData, bg_color: p.value })
                        }
                        className={`h-5 w-5 rounded-full border border-gray-300 transition-transform ${
                          formData.bg_color.toLowerCase() ===
                          p.value.toLowerCase()
                            ? 'scale-125 ring-2 ring-primary ring-offset-1'
                            : ''
                        }`}
                        style={{ backgroundColor: p.value }}
                        title={p.label}
                      />
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='sort_order'>Sort Order</Label>
                  <Input
                    id='sort_order'
                    type='number'
                    min={1}
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 1,
                      })
                    }
                    className='h-8'
                  />
                  <div className='flex items-center justify-between rounded-md border p-2 mt-2'>
                    <Label htmlFor='active_switch' className='text-xs cursor-pointer'>
                      Show on Homepage
                    </Label>
                    <Switch
                      id='active_switch'
                      checked={formData.is_active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_active: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className='pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isSaving || isUploading}>
                  {isSaving ? 'Saving...' : formData.id ? 'Save Changes' : 'Create Banner'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation dialog */}
        <Dialog
          open={deleteConfirmId !== null}
          onOpenChange={(open) => !open && setDeleteConfirmId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Hero Banner?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this hero banner? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              >
                Delete Banner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Main>
    </>
  )
}
