import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Save,
  Store,
  Truck,
  DollarSign,
  Megaphone,
  FileText,
  Share2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SiteSettings() {
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // Local state for all settings
  const [settings, setSettings] = useState<Record<string, string>>({
    store_name: 'A.I MOBILE ACCESSORIES',
    store_tagline: 'Premium Quality Mobile Accessories & Gadgets',
    contact_phone: '+92 317 7219621',
    contact_whatsapp: '+923177219621',
    contact_email: 'aimobileaccessories@gmail.com',
    store_address: 'Shop #12, Ground Floor, Mobile Market, Lahore, Pakistan',
    social_facebook: 'https://www.facebook.com/a.imobileaccessories',
    social_instagram: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=c3xugsz',
    social_tiktok: 'https://www.tiktok.com/@a.imobileaccessories?_r=1&_t=ZS-9AFBJT504rm',
    social_youtube: '',
    shipping_fee: '0',
    free_shipping_threshold: '2499',
    estimated_delivery_days: '2 - 4 business days',
    delivery_notice: 'Free shipping on orders above Rs. 2,499. Cash on Delivery available nationwide.',
    currency: 'PKR',
    currency_symbol: 'Rs.',
    announcement_enabled: '1',
    announcement_text: '⚡ FREE DELIVERY ON ORDERS OVER RS. 2,499 | CASH ON DELIVERY NATIONWIDE',
    announcement_link: '/products',
    policy_returns: '',
    policy_shipping: '',
    policy_warranty: '',
    policy_privacy: '',
    policy_terms: '',
  })

  // Fetch settings from API
  const { data, isLoading } = useQuery<Record<string, string>>({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const res = await apiClient.get('/settings')
      return res.data
    },
  })

  useEffect(() => {
    if (data) {
      setSettings((prev) => ({
        ...prev,
        ...data,
      }))
    }
  }, [data])

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    try {
      await apiClient.post('/settings', settings)
      toast.success('Site settings saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['site-settings'] })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center text-muted-foreground'>
        Loading site settings...
      </div>
    )
  }

  return (
    <div className='space-y-6 pb-12 w-full'>
      {/* Top Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Website & Store Settings</h2>
          <p className='text-sm text-muted-foreground'>
            Configure store info, delivery charges, pricing, policies, and announcement banners across the whole website.
          </p>
        </div>
        <Button onClick={() => handleSave()} disabled={isSaving} className='gap-2 shrink-0'>
          <Save className='h-4 w-4' />
          {isSaving ? 'Saving Changes...' : 'Save All Settings'}
        </Button>
      </div>

      <Tabs defaultValue='store' className='space-y-4'>
        <TabsList className='grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl h-auto p-1'>
          <TabsTrigger value='store' className='gap-1.5 py-2'>
            <Store className='h-4 w-4' /> Store Info
          </TabsTrigger>
          <TabsTrigger value='delivery' className='gap-1.5 py-2'>
            <Truck className='h-4 w-4' /> Delivery & Shipping
          </TabsTrigger>
          <TabsTrigger value='pricing' className='gap-1.5 py-2'>
            <DollarSign className='h-4 w-4' /> Price & Currency
          </TabsTrigger>
          <TabsTrigger value='announcement' className='gap-1.5 py-2'>
            <Megaphone className='h-4 w-4' /> Announcement
          </TabsTrigger>
          <TabsTrigger value='policies' className='gap-1.5 py-2'>
            <FileText className='h-4 w-4' /> Policies
          </TabsTrigger>
        </TabsList>

        {/* ── TAB 1: STORE & CONTACT INFO ──────────────────────────────── */}
        <TabsContent value='store' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Store className='h-5 w-5 text-primary' /> General Store Information
              </CardTitle>
              <CardDescription>
                Store branding, contact channels, and address displayed on the header, footer, and contact page.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label htmlFor='store_name'>Store Name</Label>
                  <Input
                    id='store_name'
                    value={settings.store_name}
                    onChange={(e) => handleChange('store_name', e.target.value)}
                    placeholder='A.I MOBILE ACCESSORIES'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='store_tagline'>Store Tagline / Slogan</Label>
                  <Input
                    id='store_tagline'
                    value={settings.store_tagline}
                    onChange={(e) => handleChange('store_tagline', e.target.value)}
                    placeholder='Premium Quality Mobile Accessories & Gadgets'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2'>
                <div className='space-y-1.5'>
                  <Label htmlFor='contact_phone' className='flex items-center gap-1.5'>
                    <Phone className='h-3.5 w-3.5 text-muted-foreground' /> Contact Phone
                  </Label>
                  <Input
                    id='contact_phone'
                    value={settings.contact_phone}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                    placeholder='+92 317 7219621'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='contact_whatsapp' className='flex items-center gap-1.5'>
                    <Phone className='h-3.5 w-3.5 text-emerald-600' /> WhatsApp Number
                  </Label>
                  <Input
                    id='contact_whatsapp'
                    value={settings.contact_whatsapp}
                    onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                    placeholder='+923177219621'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='contact_email' className='flex items-center gap-1.5'>
                    <Mail className='h-3.5 w-3.5 text-muted-foreground' /> Support Email
                  </Label>
                  <Input
                    id='contact_email'
                    type='email'
                    value={settings.contact_email}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                    placeholder='aimobileaccessories@gmail.com'
                  />
                </div>
              </div>

              <div className='space-y-1.5 pt-2'>
                <Label htmlFor='store_address' className='flex items-center gap-1.5'>
                  <MapPin className='h-3.5 w-3.5 text-muted-foreground' /> Physical Store / Warehouse Address
                </Label>
                <Input
                  id='store_address'
                  value={settings.store_address}
                  onChange={(e) => handleChange('store_address', e.target.value)}
                  placeholder='Shop #12, Ground Floor, Mobile Market, Lahore, Pakistan'
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Share2 className='h-5 w-5 text-primary' /> Social Media Links
              </CardTitle>
              <CardDescription>
                Profiles linked in the header, footer, and product shares.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label htmlFor='social_facebook'>Facebook Profile / Page URL</Label>
                  <Input
                    id='social_facebook'
                    value={settings.social_facebook}
                    onChange={(e) => handleChange('social_facebook', e.target.value)}
                    placeholder='https://www.facebook.com/a.imobileaccessories'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='social_instagram'>Instagram Profile URL</Label>
                  <Input
                    id='social_instagram'
                    value={settings.social_instagram}
                    onChange={(e) => handleChange('social_instagram', e.target.value)}
                    placeholder='https://www.instagram.com/a.imobileaccessories'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='social_tiktok'>TikTok Profile URL</Label>
                  <Input
                    id='social_tiktok'
                    value={settings.social_tiktok}
                    onChange={(e) => handleChange('social_tiktok', e.target.value)}
                    placeholder='https://www.tiktok.com/@a.imobileaccessories'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label htmlFor='social_youtube'>YouTube Channel URL (Optional)</Label>
                  <Input
                    id='social_youtube'
                    value={settings.social_youtube}
                    onChange={(e) => handleChange('social_youtube', e.target.value)}
                    placeholder='https://youtube.com/@channel'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 2: DELIVERY & SHIPPING ──────────────────────────────── */}
        <TabsContent value='delivery' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Truck className='h-5 w-5 text-primary' /> Delivery & Shipping Rates
              </CardTitle>
              <CardDescription>
                Set the delivery fee, free shipping thresholds, and estimated turnaround time calculated in the cart and checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-1.5'>
                  <Label htmlFor='shipping_fee'>Standard Delivery Fee ({settings.currency_symbol || 'Rs.'})</Label>
                  <Input
                    id='shipping_fee'
                    type='number'
                    min='0'
                    value={settings.shipping_fee}
                    onChange={(e) => handleChange('shipping_fee', e.target.value)}
                    placeholder='0 for Free'
                  />
                  <p className='text-[11px] text-muted-foreground'>
                    Set to 0 if shipping is always free by default.
                  </p>
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='free_shipping_threshold'>Free Delivery Threshold ({settings.currency_symbol || 'Rs.'})</Label>
                  <Input
                    id='free_shipping_threshold'
                    type='number'
                    min='0'
                    value={settings.free_shipping_threshold}
                    onChange={(e) => handleChange('free_shipping_threshold', e.target.value)}
                    placeholder='2499'
                  />
                  <p className='text-[11px] text-muted-foreground'>
                    Orders at or above this subtotal qualify for free shipping.
                  </p>
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='estimated_delivery_days'>Estimated Delivery Time</Label>
                  <Input
                    id='estimated_delivery_days'
                    value={settings.estimated_delivery_days}
                    onChange={(e) => handleChange('estimated_delivery_days', e.target.value)}
                    placeholder='2 - 4 business days'
                  />
                  <p className='text-[11px] text-muted-foreground'>
                    Shown on product detail and checkout pages.
                  </p>
                </div>
              </div>

              <div className='space-y-1.5 pt-2'>
                <Label htmlFor='delivery_notice'>Delivery Notice / Badge Text</Label>
                <Textarea
                  id='delivery_notice'
                  rows={2}
                  value={settings.delivery_notice}
                  onChange={(e) => handleChange('delivery_notice', e.target.value)}
                  placeholder='Free shipping on orders above Rs. 2,499. Cash on Delivery available nationwide.'
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 3: PRICE & CURRENCY ─────────────────────────────────── */}
        <TabsContent value='pricing' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <DollarSign className='h-5 w-5 text-primary' /> Currency & Price Formatting
              </CardTitle>
              <CardDescription>
                Controls currency code and symbol displayed across all products, cart, and invoice totals.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg'>
                <div className='space-y-1.5'>
                  <Label htmlFor='currency_symbol'>Currency Symbol</Label>
                  <Input
                    id='currency_symbol'
                    value={settings.currency_symbol}
                    onChange={(e) => handleChange('currency_symbol', e.target.value)}
                    placeholder='Rs.'
                  />
                  <p className='text-[11px] text-muted-foreground'>e.g. Rs., ₨, $, AED</p>
                </div>

                <div className='space-y-1.5'>
                  <Label htmlFor='currency'>ISO Currency Code</Label>
                  <Input
                    id='currency'
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value.toUpperCase())}
                    placeholder='PKR'
                  />
                  <p className='text-[11px] text-muted-foreground'>e.g. PKR, USD, AED</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 4: ANNOUNCEMENT BAR ─────────────────────────────────── */}
        <TabsContent value='announcement' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Megaphone className='h-5 w-5 text-primary' /> Top Announcement Bar
              </CardTitle>
              <CardDescription>
                The promotional banner displayed at the very top of every page on the storefront.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <Label htmlFor='announcement_enabled' className='text-base cursor-pointer'>
                    Show Top Announcement Bar
                  </Label>
                  <p className='text-xs text-muted-foreground'>
                    Toggle visibility of the announcement bar on all customer pages.
                  </p>
                </div>
                <Switch
                  id='announcement_enabled'
                  checked={settings.announcement_enabled === '1'}
                  onCheckedChange={(checked) =>
                    handleChange('announcement_enabled', checked ? '1' : '0')
                  }
                />
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='announcement_text'>Announcement Message Text</Label>
                <Input
                  id='announcement_text'
                  value={settings.announcement_text}
                  onChange={(e) => handleChange('announcement_text', e.target.value)}
                  placeholder='⚡ FREE DELIVERY ON ORDERS OVER RS. 2,499 | CASH ON DELIVERY NATIONWIDE'
                />
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='announcement_link'>Target URL / Link (Optional)</Label>
                <Input
                  id='announcement_link'
                  value={settings.announcement_link}
                  onChange={(e) => handleChange('announcement_link', e.target.value)}
                  placeholder='/products'
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 5: POLICIES & TERMS ─────────────────────────────────── */}
        <TabsContent value='policies' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <FileText className='h-5 w-5 text-primary' /> Store Policies
              </CardTitle>
              <CardDescription>
                Customers see these policies on the Policies page, checkout agreement, and footer links.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='policy_returns' className='font-semibold'>
                  Return & Exchange Policy
                </Label>
                <Textarea
                  id='policy_returns'
                  rows={4}
                  value={settings.policy_returns}
                  onChange={(e) => handleChange('policy_returns', e.target.value)}
                  placeholder='Explain return windows, conditions, and exchange procedure...'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='policy_shipping' className='font-semibold'>
                  Shipping & Delivery Policy
                </Label>
                <Textarea
                  id='policy_shipping'
                  rows={4}
                  value={settings.policy_shipping}
                  onChange={(e) => handleChange('policy_shipping', e.target.value)}
                  placeholder='Explain shipping timelines, courier partners, and tracking...'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='policy_warranty' className='font-semibold'>
                  Warranty & Electronic Testing Policy
                </Label>
                <Textarea
                  id='policy_warranty'
                  rows={3}
                  value={settings.policy_warranty}
                  onChange={(e) => handleChange('policy_warranty', e.target.value)}
                  placeholder='Guidelines for testing chargers, cables, earbuds...'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='policy_privacy' className='font-semibold'>
                  Privacy Policy
                </Label>
                <Textarea
                  id='policy_privacy'
                  rows={3}
                  value={settings.policy_privacy}
                  onChange={(e) => handleChange('policy_privacy', e.target.value)}
                  placeholder='Customer data protection and security statement...'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='policy_terms' className='font-semibold'>
                  Terms & Conditions
                </Label>
                <Textarea
                  id='policy_terms'
                  rows={3}
                  value={settings.policy_terms}
                  onChange={(e) => handleChange('policy_terms', e.target.value)}
                  placeholder='Terms of sale, COD payment responsibilities...'
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating / Bottom Save Bar */}
      <div className='flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600' />
          <span>All settings are saved directly to MySQL database and take effect storewide immediately.</span>
        </div>
        <Button onClick={() => handleSave()} disabled={isSaving} className='gap-2'>
          <Save className='h-4 w-4' />
          {isSaving ? 'Saving Changes...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  )
}
