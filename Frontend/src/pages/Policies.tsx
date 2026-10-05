import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";
import { Shield, RotateCcw, AlertCircle, Package, Zap, Headphones, Truck, PhoneCall, Video, X, CheckCircle2, FileText, UserCheck } from "lucide-react";

const policies = [
  {
    id: "returns",
    icon: <RotateCcw className="h-5 w-5" />,
    number: "01",
    title: "Return & Exchange",
    content:
      "Defective, damaged, or incorrectly delivered products may be returned or exchanged within 24 hours of delivery.",
    type: "info",
  },
  {
    id: "condition",
    icon: <Package className="h-5 w-5" />,
    number: "02",
    title: "Return Condition",
    content:
      "Products must be unused, undamaged and in their original packaging with all accessories included.",
    type: "info",
  },
  {
    id: "mind",
    icon: <X className="h-5 w-5" />,
    number: "03",
    title: "Change of Mind",
    content:
      "Returns are not accepted due to change of mind, wrong selection, or personal preference.",
    type: "warning",
  },
  {
    id: "compatibility",
    icon: <AlertCircle className="h-5 w-5" />,
    number: "04",
    title: "Product Compatibility",
    content:
      "Customers are responsible for confirming the correct mobile model and product compatibility before ordering.",
    type: "warning",
  },
  {
    id: "used",
    icon: <Shield className="h-5 w-5" />,
    number: "05",
    title: "Installed / Used Products",
    content:
      "Installed, opened, modified or used products are generally not eligible for return or exchange.",
    type: "warning",
  },
  {
    id: "electronics",
    icon: <Zap className="h-5 w-5" />,
    number: "06",
    title: "Electronic Accessories",
    content:
      "Chargers, cables, hands-free devices, earbuds, power banks and similar items should be tested immediately after delivery. Any issue must be reported within 24 hours.",
    type: "important",
  },
  {
    id: "warranty",
    icon: <CheckCircle2 className="h-5 w-5" />,
    number: "07",
    title: "Warranty",
    content:
      "Warranty, where applicable, covers manufacturing defects only. Physical damage, water damage, misuse, burning, tampering or unauthorized repair is NOT covered.",
    type: "info",
  },
  {
    id: "damage",
    icon: <Truck className="h-5 w-5" />,
    number: "08",
    title: "Delivery Damage",
    content:
      "Customers should take clear photos/videos of the parcel and product if any damage is noticed and contact us within 24 hours.",
    type: "important",
  },
  {
    id: "wrong",
    icon: <AlertCircle className="h-5 w-5" />,
    number: "09",
    title: "Wrong or Missing Item",
    content:
      "Any wrong or missing item must be reported within 24 hours with relevant photos/videos for verification.",
    type: "important",
  },
  {
    id: "unboxing",
    icon: <Video className="h-5 w-5" />,
    number: "10",
    title: "Unboxing Video",
    content:
      "For electronic or expensive products, customers are strongly advised to record a complete unboxing video for claim verification.",
    type: "info",
  },
  {
    id: "cancellation",
    icon: <X className="h-5 w-5" />,
    number: "11",
    title: "Order Cancellation",
    content:
      "Orders can be cancelled before dispatch. Once dispatched, cancellation may not be possible.",
    type: "info",
  },
  {
    id: "customer-info",
    icon: <UserCheck className="h-5 w-5" />,
    number: "12",
    title: "Customer Information",
    content:
      "Customers are responsible for providing the correct name, phone number, address and mobile model at the time of ordering.",
    type: "info",
  },
  {
    id: "verification",
    icon: <FileText className="h-5 w-5" />,
    number: "13",
    title: "Claim Verification",
    content:
      "All return, exchange and warranty claims are subject to verification and approval by A.I Mobile Accessories.",
    type: "info",
  },
  {
    id: "acceptance",
    icon: <CheckCircle2 className="h-5 w-5" />,
    number: "14",
    title: "Policy Acceptance",
    content:
      "By placing an order, the customer confirms that they have read and accepted these policies.",
    type: "important",
  },
];

const typeConfig = {
  info: {
    border: "border-border",
    iconBg: "bg-foreground",
    iconColor: "text-[#f5c518]",
    numberColor: "text-foreground/20",
  },
  warning: {
    border: "border-orange-200",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    numberColor: "text-orange-100",
  },
  important: {
    border: "border-yellow-200",
    iconBg: "",
    iconColor: "text-[#0a0a0a]",
    numberColor: "text-yellow-100",
  },
};

const Policies = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)" }}
      >
        <div className="absolute inset-0 tech-bg opacity-30" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-20 blur-3xl rounded-full"
          style={{ background: "#f5c518" }}
        />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-4 border"
              style={{
                background: "rgba(245,197,24,0.1)",
                borderColor: "rgba(245,197,24,0.3)",
                color: "#f5c518",
              }}
            >
              <Shield className="h-3 w-3" />
              A.I Mobile Accessories
            </div>
            <h1
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide"
            >
              Return &{" "}
              <span className="gold-shimmer-text">Customer Policies</span>
            </h1>
            <p className="font-body text-sm sm:text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Please read our policies carefully before placing an order. Your satisfaction is our priority.
            </p>
          </motion.div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #f5c518, transparent)" }}
        />
      </div>

      {/* Policy Cards */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {policies.map((policy, i) => {
            const config = typeConfig[policy.type as keyof typeof typeConfig];
            const isImportant = policy.type === "important";
            return (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-md ${config.border}`}
                style={isImportant ? {
                  background: "linear-gradient(135deg, #fefce8, #fffbeb)",
                  borderColor: "rgba(245,197,24,0.3)",
                } : {}}
              >
                {/* Number watermark */}
                <span
                  className={`absolute right-4 top-3 font-display text-5xl font-bold select-none ${config.numberColor}`}
                >
                  {policy.number}
                </span>

                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${
                      isImportant ? "" : config.iconBg
                    } ${config.iconColor}`}
                    style={isImportant ? {
                      background: "linear-gradient(135deg, #f5c518, #d4a017)",
                      boxShadow: "0 4px 12px rgba(245,197,24,0.3)",
                    } : {}}
                  >
                    {policy.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-foreground mb-1">
                      {policy.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {policy.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #111)" }}
        >
          <div className="relative p-8 sm:p-10 text-center">
            <div className="absolute inset-0 tech-bg opacity-20" />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 opacity-20 blur-2xl rounded-full"
              style={{ background: "#f5c518" }}
            />
            <div className="relative z-10">
              <p
                className="font-display text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                <span className="gold-shimmer-text">A.I Mobile Accessories</span>
              </p>
              <p className="font-nav text-sm tracking-widest uppercase mb-6" style={{ color: "rgba(245,197,24,0.7)" }}>
                Quality Products • Honest Service • Customer Satisfaction
              </p>
              <p className="font-body text-sm max-w-xl mx-auto mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                For any questions regarding returns, exchanges, or warranty claims, please contact us directly.
              </p>
              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-nav text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f5c518, #d4a017)",
                  color: "#0a0a0a",
                  boxShadow: "0 4px 20px rgba(245,197,24,0.35)",
                }}
              >
                <PhoneCall className="h-4 w-4" />
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Policies;
