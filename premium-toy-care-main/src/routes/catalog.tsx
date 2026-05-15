import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, MessageCircle, PackageSearch, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Spare Parts Catalog — MyToysCare" },
      { name: "description", content: "Browse our genuine spare parts catalog: motherboards, remotes, batteries, gearboxes, music boards and more for kids' toys." },
      { property: "og:title", content: "Spare Parts Catalog — MyToysCare" },
      { property: "og:description", content: "Genuine spare parts for kids ride-on toys, RC cars, bikes and scooters." },
    ],
  }),
  component: Catalog,
});

type Product = { name: string; category: string; img: string };

const catalogJpg = import.meta.glob("../assets/catalog/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const catalogPng = import.meta.glob("../assets/catalog/*.png", { eager: true, import: "default" }) as Record<string, string>;

const image = (file: string) => {
  const jpg = catalogJpg[`../assets/catalog/${file}`];
  if (jpg) return jpg;
  return catalogPng[`../assets/catalog/${file}`];
};

const products: Product[] = [
  // Motherboards
  { name: "Big Motherboard", category: "motherboard", img: image("big_mb1.jpg") },
  { name: "Big Motherboard (Variant)", category: "motherboard", img: image("bigmb_3.jpg") },
  { name: "Small Motherboard", category: "motherboard", img: image("small_mb.jpg") },
  { name: "Small Motherboard (Variant)", category: "motherboard", img: image("small_mb2.jpg") },
  { name: "Small Blue Motherboard", category: "motherboard", img: image("smallblue_mb2.jpg") },
  { name: "Small Motherboard 12", category: "motherboard", img: image("smallmb_12.jpg") },
  { name: "Motherboard with Remote", category: "motherboard", img: image("Mb_remote1.jpg") },
  { name: "Small MB + Remote", category: "motherboard", img: image("smallmb_remote2.jpg") },
  { name: "Multifunctional Board", category: "motherboard", img: image("multifunctional_board.jpg") },
  { name: "Multifunctional Board V2", category: "motherboard", img: image("multifunctional_board2.jpg") },
  { name: "Hoverboard Motherboard", category: "motherboard", img: image("hoverboard_motherboard.png") },
  { name: "Controller Box", category: "motherboard", img: image("gray_mb_box.png") },
  { name: "Dashboard Panel", category: "motherboard", img: image("dashboard_panel.png") },
  { name: "Speedometer Dashboard", category: "motherboard", img: image("speedometer_dashboard.png") },
  // Remotes
  { name: "Remote Controller", category: "remote", img: image("remote1.jpg") },
  { name: "Remote Controller V2", category: "remote", img: image("remote2.jpg") },
  { name: "Remote Controller 7", category: "remote", img: image("remote_7.jpg") },
  { name: "Multifunctional Remote", category: "remote", img: image("multifunctional_remote.jpg") },
  { name: "JR Receiver & Transmitter", category: "remote", img: image("jr_receiver_transmitter.png") },
  { name: "12V 7-Pin Remote Set", category: "remote", img: image("remote_7pin_set.png") },
  { name: "Honghui Remote", category: "remote", img: image("honghui_remote.png") },
  { name: "Remote & Receiver Set", category: "remote", img: image("small_remote_set.png") },
  // Controllers
  { name: "HCD Motor Controller", category: "controller", img: image("hcd_controller.png") },
  { name: "JR1721PWM Controller", category: "controller", img: image("jr1721pwm_controller.png") },
  { name: "Electric Bike Controller", category: "controller", img: image("electric_bike_controller.png") },
  { name: "Scooter Motor Controller", category: "controller", img: image("scooter_motor_controller.png") },
  { name: "Motor Controller 24V", category: "controller", img: image("motor_controller_24v.png") },
  // Gearbox / Steering
  { name: "Steering Assembly", category: "gearbox", img: image("stearing1.jpg") },
  { name: "Steering Motor", category: "gearbox", img: image("stearing_motor.jpg") },
  { name: "Steering Motor V3", category: "gearbox", img: image("stearing_motor3.jpg") },
  { name: "Gearbox Motor 12V", category: "gearbox", img: image("gearbox_motor_12v.png") },
  { name: "Gear Shift Knob", category: "gearbox", img: image("gear_shift_knob.png") },
  // Accelerators / Bike
  { name: "Hand Accelerator", category: "bike", img: image("hand_accelarator.jpg") },
  { name: "Accelerator Paddle", category: "bike", img: image("accelerator_paddle.jpg") },
  { name: "Bike Hand Accelerator", category: "bike", img: image("bike_hand_accelerator.png") },
  { name: "Carburetor", category: "bike", img: image("carburetor.png") },
  // Music Boards
  { name: "Music Board", category: "music", img: image("music_board.jpg") },
  { name: "Music Board (Black)", category: "music", img: image("music_black.jpg") },
  { name: "Round Music Board", category: "music", img: image("roundmusic_3.jpg") },
  { name: "Round Music Board V5", category: "music", img: image("roundmusic_board5.jpg") },
  { name: "LED Music Board", category: "music", img: image("music_board_led.png") },
  { name: "Round Music Board USB", category: "music", img: image("round_music_usb.png") },
  { name: "Music Control Panel", category: "music", img: image("music_control_panel.png") },
  // Chargers
  { name: "Big Charging Circuit", category: "charger", img: image("bigcharging_circuit.jpg") },
  { name: "Small Charging Circuit", category: "charger", img: image("smallcharging_circuit.jpg") },
  { name: "12V Charger", category: "charger", img: image("12v_charger.jpg") },
  { name: "Battery Charger", category: "charger", img: image("battery_charger.png") },
  { name: "Petrol Bike Charger", category: "charger", img: image("petrol_bike_charger.png") },
  { name: "Dirt Bike Charger", category: "charger", img: image("dirt_bike_charger.png") },
  { name: "Scooter Charger Adapter", category: "charger", img: image("scooter_charger_adapter.png") },
  // Batteries
  { name: "Battery Pack", category: "battery", img: image("battery_pack.png") },
  { name: "Battery Clips", category: "battery", img: image("battery_clips.png") },
  { name: "Panja Set", category: "battery", img: image("panja_set.png") },
  { name: "20A Fuse", category: "battery", img: image("fuse_20a.png") },
  // Speakers
  { name: "Speaker", category: "speaker", img: image("speaker.jpg") },
  { name: "Speaker V2", category: "speaker", img: image("speaker_2.jpg") },
  { name: "Big Speaker", category: "speaker", img: image("big_speaker.jpg") },
  // Switches & Keys
  { name: "Key Set", category: "switch", img: image("key_set1.jpg") },
  { name: "Power Button", category: "switch", img: image("power_button.png") },
  { name: "Direction Switch", category: "switch", img: image("direction_switch.png") },
  { name: "Round Rocker Switch", category: "switch", img: image("round_rocker_switch.png") },
  { name: "BMW Model Switch", category: "switch", img: image("bmw_model_switch.png") },
  // Wiring
  { name: "Normal Wiring Set", category: "wiring", img: image("wiring_set.png") },
  { name: "Multi Wiring Set", category: "wiring", img: image("multi_wiring_set.png") },
];

const categories = [
  { id: "all", label: "All" },
  { id: "motherboard", label: "Motherboards" },
  { id: "remote", label: "Remotes" },
  { id: "controller", label: "Controllers" },
  { id: "gearbox", label: "Steering & Motor" },
  { id: "bike", label: "Accelerators" },
  { id: "music", label: "Music Boards" },
  { id: "charger", label: "Chargers" },
  { id: "battery", label: "Batteries & Fuses" },
  { id: "speaker", label: "Speakers" },
  { id: "switch", label: "Keys & Switches" },
  { id: "wiring", label: "Wiring" },
];

function RequestPartForm() {
  const [form, setForm] = useState({ name: "", phone: "", model: "", part: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hi MyToysCare! I can't find a part I need.`,
      `Name: ${form.name}`,
      form.phone ? `My WhatsApp: ${form.phone}` : "",
      form.model ? `Toy Model: ${form.model}` : "",
      `Part needed: ${form.part}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/917903913346?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <Reveal>
      <div className="mt-20 max-w-xl mx-auto rounded-2xl border border-brand/30 bg-gradient-card shadow-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
            <PackageSearch className="h-5 w-5 text-brand-foreground" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Can't find your part?</h2>
            <p className="text-xs text-muted-foreground">Tell us what you need — we'll source it for you.</p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-brand" />
            <p className="font-semibold text-lg">Request sent on WhatsApp!</p>
            <p className="text-sm text-muted-foreground">We'll get back to you shortly with availability and pricing.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: "", phone: "", model: "", part: "" }); }}
              className="mt-2 text-xs text-brand underline underline-offset-2"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ravi Kumar"
                  className="rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">WhatsApp Number</label>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className="rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Toy Model / Brand (optional)</label>
              <input
                value={form.model}
                onChange={set("model")}
                placeholder="e.g. BMW X5 ride-on, Lamborghini 12V"
                className="rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Part You Need *</label>
              <textarea
                required
                rows={3}
                value={form.part}
                onChange={set("part")}
                placeholder="e.g. 12V motherboard for remote-controlled Jeep, steering motor for bike..."
                className="rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              <Send className="h-4 w-4" /> Send Request on WhatsApp
            </button>
          </form>
        )}
      </div>
    </Reveal>
  );
}

function Catalog() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (active === "all" || p.category === active) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [active, query],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Spare Parts</div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold">
                All <span className="text-gradient-brand">Spare Parts</span>
              </h1>
              <p className="mt-4 text-muted-foreground">Genuine parts in stock — order on WhatsApp for fastest dispatch.</p>
            </div>
          </Reveal>

          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search parts..."
              className="w-full rounded-xl border border-border bg-surface-elevated pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition flex items-center gap-1.5 ${
                  active === c.id
                    ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow"
                    : "border-border bg-surface-elevated text-muted-foreground hover:text-brand hover:border-brand/40"
                }`}
              >
                {c.label}
                <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${
                  active === c.id ? "bg-white/20" : "bg-surface text-brand/70"
                }`}>
                  {counts[c.id] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <div
                key={p.name + i}
                className="group flex h-full animate-fade-in flex-col rounded-2xl border border-border bg-gradient-card p-3 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40"
                style={{ animationDelay: `${(i % 8) * 40}ms` }}
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-surface-elevated">
                  <img src={p.img} alt={p.name} loading="eager" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 px-1 pt-3">
                  <h3 className="text-sm font-semibold leading-tight">{p.name}</h3>
                  <div className="mt-1 text-xs font-medium text-brand">In Stock</div>
                </div>
                <a
                  href={`https://wa.me/917903913346?text=I%20want%20${encodeURIComponent(p.name)}`}
                  target="_blank" rel="noopener"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Order
                </a>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No parts match your search.</p>
          )}

          <RequestPartForm />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
