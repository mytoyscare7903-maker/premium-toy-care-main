import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, MessageCircle, PackageSearch, Send, CheckCircle2, Info, X } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/catalog")({
  component: Catalog,
});

type Product = { name: string; category: string; img: string; description: string };
type DiyItem  = { name: string; img: string; description: string };

const catalogJpg = import.meta.glob("../assets/catalog/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const catalogPng = import.meta.glob("../assets/catalog/*.png", { eager: true, import: "default" }) as Record<string, string>;

const image = (file: string) => {
  const jpg = catalogJpg[`../assets/catalog/${file}`];
  if (jpg) return jpg;
  return catalogPng[`../assets/catalog/${file}`];
};

function waEnquiry(name: string, description: string, imgSrc: string): string {
  const origin = window.location.origin;
  const imgUrl = imgSrc.startsWith("http") ? imgSrc : `${origin}${imgSrc}`;
  const msg = [
    "Hello MyToysCare,",
    "",
    "I want enquiry for this product.",
    "",
    `Product Name: ${name}`,
    "",
    "Description:",
    description,
    "",
    "Product Image:",
    imgUrl,
    "",
    "Product Link:",
    `${origin}/catalog`,
  ].join("\n");
  return `https://wa.me/916204594205?text=${encodeURIComponent(msg)}`;
}

const diyItems: DiyItem[] = [
  { name: "DC Motors",              img: image("diy2_dc_motors.jpg"),          description: "Standard DC hobby motors suitable for small robots and DIY toy builds. Multiple voltage ratings available." },
  { name: "Gear Motors",            img: image("diy2_gear_motors.jpg"),         description: "Gear-reduced DC motors offering higher torque at lower RPM. Ideal for wheels and mechanical arms." },
  { name: "Propeller Blades",       img: image("diy2_propeller_blades.jpg"),    description: "Lightweight plastic propeller blades compatible with standard hobby motors for DIY drone and fan projects." },
  { name: "Propellers (4 Blade)",   img: image("diy2_propellers_4blade.jpg"),   description: "4-blade propellers for increased thrust in drone or hovercraft DIY builds." },
  { name: "Rubber Tires",           img: image("diy2_rubber_tires.jpg"),        description: "Grippy rubber tires for DIY robot and toy car projects. Available in multiple sizes." },
  { name: "LEDs (Assorted)",        img: image("diy2_leds_assorted.jpg"),       description: "Assorted LED pack in multiple colours — red, green, blue, yellow, white. Great for indicators and lighting." },
  { name: "Metal Connectors",       img: image("diy2_metal_connectors.jpg"),    description: "Sturdy metal crimp connectors and terminals for reliable electrical connections in DIY builds." },
  { name: "Plastic Bushes",         img: image("diy2_plastic_bushes.jpg"),      description: "Plastic bushings for smooth axle rotation and shaft alignment in motorised toy projects." },
  { name: "Push Switches",          img: image("diy2_push_switches.jpg"),       description: "Momentary push-button switches for circuits, robot triggers, and control panels." },
  { name: "Screws & Bolts",         img: image("diy2_screws_bolts.jpg"),        description: "Assorted M2/M3 screws and bolts for assembling robot chassis and toy enclosures." },
  { name: "LDR Sensors",            img: image("diy2_ldr_sensors.jpg"),         description: "Light Dependent Resistors (LDR) for line-following robots and light-sensitive DIY projects." },
  { name: "Buzzer",                 img: image("diy2_buzzer.jpg"),              description: "Active piezo buzzer for alerts and sound feedback in Arduino or standalone projects." },
  { name: "Connecting Wires",       img: image("diy2_connecting_wires.jpg"),    description: "Flexible single-strand connecting wires for breadboard and prototype circuit connections." },
  { name: "Slide Switches",         img: image("diy2_slide_switches.jpg"),      description: "SPDT slide switches for power on/off and mode selection in DIY electronic builds." },
  { name: "Rocker Switches",        img: image("diy2_rocker_switches.jpg"),     description: "Panel-mount rocker switches for controlling motors and power circuits in toy projects." },
  { name: "Screwdriver & Cutter",   img: image("diy2_screwdriver_cutter.jpg"), description: "Mini precision screwdriver and wire cutter set for electronics assembly and repair." },
  { name: "Alligator Clips",        img: image("diy2_alligator_clips.jpg"),     description: "Insulated alligator clip leads for quick prototyping and battery connections." },
  { name: "Jumper Wires",           img: image("diy2_jumper_wires.jpg"),        description: "Dupont jumper wires (M-M, M-F, F-F) for breadboard and microcontroller projects." },
  { name: "Breadboard",             img: image("diy2_breadboard.jpg"),          description: "Solderless 830-point breadboard for prototyping electronic circuits without soldering." },
  { name: "Jumper Cables",          img: image("diy2_jumper_cables.jpg"),       description: "Heavy-duty jumper cables for connecting battery packs and power distribution." },
  { name: "9V Battery & Snap",      img: image("diy2_9v_battery.jpg"),          description: "9V alkaline battery with snap connector — ideal for powering small robots and sensor circuits." },
  { name: "Battery Snap",           img: image("diy2_battery_snap.jpg"),        description: "9V battery snap connector with wire leads for quick battery connection in DIY projects." },
  { name: "Battery Holder",         img: image("diy2_battery_holder.jpg"),      description: "AA/AAA battery holder with switch and wire leads for portable DIY power supplies." },
  { name: "18650 Battery Cells",    img: image("diy2_18650_cells.jpg"),         description: "Rechargeable 18650 Li-ion cells for high-capacity DIY battery packs and robot power." },
  { name: "Wooden Sticks",          img: image("diy2_wooden_sticks.jpg"),       description: "Craft and popsicle wooden sticks for building DIY toy frames, bridges, and structures." },
  { name: "Rubber Bands",           img: image("diy2_rubber_bands.jpg"),        description: "Assorted rubber bands for DIY mechanical projects, tensioning, and simple machines." },
  { name: "Plastic Wheels (Large)", img: image("diy2_wheels_large.jpg"),        description: "Large diameter plastic wheels for robot cars and motorised DIY vehicles." },
  { name: "Resistors (Assorted)",   img: image("diy2_resistors.jpg"),           description: "Carbon film resistors in popular values (100Ω–1MΩ) for current limiting and voltage dividers." },
  { name: "Capacitors (Assorted)",  img: image("diy2_capacitors.jpg"),          description: "Electrolytic and ceramic capacitors for filtering, timing, and energy storage in circuits." },
  { name: "Diodes",                 img: image("diy2_diodes.jpg"),              description: "1N4007 rectifier diodes for polarity protection and power circuits in DIY builds." },
  { name: "BO Motors",              img: image("diy2_bo_motors.jpg"),           description: "Battery-Operated (BO) gear motors — the standard motor for school and hobby robots." },
  { name: "Caster Wheel",           img: image("diy2_caster_wheel.jpg"),        description: "360° swivel caster wheel for the rear/front support of 2-wheeled DIY robots." },
  { name: "Solar Panel",            img: image("diy2_solar_panel.jpg"),         description: "Small solar panel (5V) for solar-powered DIY toy and science project builds." },
  { name: "Robot Chassis",          img: image("diy2_robot_chassis.jpg"),       description: "2-wheel drive acrylic/plastic robot chassis kit with motor mounts and battery tray." },
  { name: "Plastic Wheels (Small)", img: image("diy2_wheels_small.jpg"),        description: "Small plastic wheels compatible with BO motors and standard robot chassis kits." },
];

const products: Product[] = [
  // Motherboards
  { name: "Big Motherboard",               category: "motherboard", img: image("big_mb1.jpg"),                   description: "Large-format ride-on toy motherboard with multi-function support for 12V/24V systems. Controls motor, music, lights and remote receiver." },
  { name: "Big Motherboard (Variant)",     category: "motherboard", img: image("bigmb_3.jpg"),                   description: "Alternate variant of the big motherboard with extended I/O ports for complex ride-on toy setups." },
  { name: "Small Motherboard",             category: "motherboard", img: image("small_mb.jpg"),                  description: "Compact toy motherboard for 6V–12V ride-on cars. Integrates motor driver, music module, and remote receiver." },
  { name: "Small Motherboard (Variant)",   category: "motherboard", img: image("small_mb2.jpg"),                 description: "Variant small motherboard with different connector layout. Suitable for compact ride-on models." },
  { name: "Small Blue Motherboard",        category: "motherboard", img: image("smallblue_mb2.jpg"),             description: "Blue-PCB small motherboard designed for 6V kids' cars with built-in music and motor control." },
  { name: "Small Motherboard 12",          category: "motherboard", img: image("smallmb_12.jpg"),                description: "12V compatible small motherboard for upgraded ride-on vehicles needing more power and features." },
  { name: "Motherboard with Remote",       category: "motherboard", img: image("Mb_remote1.jpg"),                description: "Motherboard bundled with its paired remote control. Plug-and-play replacement for ride-on toy electronics." },
  { name: "Small MB + Remote",             category: "motherboard", img: image("smallmb_remote2.jpg"),           description: "Small motherboard and remote set in a compact form factor. Ideal for lightweight ride-on models." },
  { name: "Multifunctional Board",         category: "motherboard", img: image("multifunctional_board.jpg"),     description: "Advanced multifunctional control board supporting motor, lights, USB, SD card, and Bluetooth audio." },
  { name: "Multifunctional Board V2",      category: "motherboard", img: image("multifunctional_board2.jpg"),    description: "Updated version of the multifunctional board with improved heat dissipation and more I/O options." },
  { name: "Hoverboard Motherboard",        category: "motherboard", img: image("hoverboard_motherboard.png"),    description: "Replacement motherboard for self-balancing hoverboards. Compatible with most 6.5\"/8\" models." },
  { name: "Controller Box",               category: "motherboard", img: image("gray_mb_box.png"),               description: "Enclosed controller box housing the main PCB for water-resistant and dustproof installation." },
  { name: "Dashboard Panel",              category: "motherboard", img: image("dashboard_panel.png"),           description: "Toy car dashboard panel with switches, display, and audio controls for realistic ride-on experience." },
  { name: "Speedometer Dashboard",        category: "motherboard", img: image("speedometer_dashboard.png"),     description: "Decorative speedometer dashboard panel for kids' ride-on cars. Adds realistic cockpit feel." },
  // Remotes
  { name: "Remote Controller",            category: "remote", img: image("remote1.jpg"),                        description: "Standard 2.4GHz parental remote controller for ride-on cars. Controls speed, direction, and horn." },
  { name: "Remote Controller V2",         category: "remote", img: image("remote2.jpg"),                        description: "Upgraded remote with additional function buttons and extended range up to 30 metres." },
  { name: "Remote Controller 7",          category: "remote", img: image("remote_7.jpg"),                       description: "7-function remote controller for advanced ride-on vehicles with multi-channel control." },
  { name: "Multifunctional Remote",       category: "remote", img: image("multifunctional_remote.jpg"),         description: "Feature-rich remote with speed modes, music control, and forward/reverse for ride-on toys." },
  { name: "JR Receiver & Transmitter",    category: "remote", img: image("jr_receiver_transmitter.png"),        description: "JR-standard RC receiver and transmitter pair. Compatible with most hobby-grade ride-on toys." },
  { name: "12V 7-Pin Remote Set",         category: "remote", img: image("remote_7pin_set.png"),                description: "Complete 12V remote set with 7-pin connector. Direct replacement for compatible ride-on systems." },
  { name: "Honghui Remote",               category: "remote", img: image("honghui_remote.png"),                 description: "Honghui-brand remote controller for specific ride-on car models requiring proprietary replacement." },
  { name: "Remote & Receiver Set",        category: "remote", img: image("small_remote_set.png"),               description: "Compact remote and receiver set pre-paired from factory. Easy plug-and-play installation." },
  // Controllers
  { name: "HCD Motor Controller",         category: "controller", img: image("hcd_controller.png"),             description: "HCD series motor speed controller for 12V/24V DC motors in ride-on cars and scooters." },
  { name: "JR1721PWM Controller",         category: "controller", img: image("jr1721pwm_controller.png"),       description: "PWM motor controller for precise speed regulation in electric scooters and ride-on vehicles." },
  { name: "Electric Bike Controller",     category: "controller", img: image("electric_bike_controller.png"),   description: "Controller for electric toy bikes and scooters. Handles throttle input and motor speed management." },
  { name: "Scooter Motor Controller",     category: "controller", img: image("scooter_motor_controller.png"),   description: "Dedicated motor controller for electric kick scooters and ride-on bikes up to 36V." },
  { name: "Motor Controller 24V",         category: "controller", img: image("motor_controller_24v.png"),       description: "24V motor speed controller for high-power ride-on vehicles and twin-motor setups." },
  // Gearbox / Steering
  { name: "Steering Assembly",            category: "gearbox", img: image("stearing1.jpg"),                     description: "Complete steering assembly including column, rack and motor bracket for ride-on cars." },
  { name: "Steering Motor",               category: "gearbox", img: image("stearing_motor.jpg"),                description: "Electric power steering motor for kids' ride-on cars. Direct OEM-compatible replacement." },
  { name: "Steering Motor V3",            category: "gearbox", img: image("stearing_motor3.jpg"),               description: "Third-generation steering motor with improved torque and quieter gear meshing." },
  { name: "Gearbox Motor 12V",            category: "gearbox", img: image("gearbox_motor_12v.png"),             description: "12V DC gearbox motor with integrated reduction gears for ride-on car wheel drive." },
  { name: "Gear Shift Knob",              category: "gearbox", img: image("gear_shift_knob.png"),               description: "Decorative gear shift knob for ride-on toy car dashboards. Plastic, easy to install." },
  // Accelerators / Bike
  { name: "Hand Accelerator",             category: "bike", img: image("hand_accelarator.jpg"),                 description: "Handlebar-mounted hand throttle for electric ride-on bikes and scooters. Variable speed." },
  { name: "Accelerator Paddle",           category: "bike", img: image("accelerator_paddle.jpg"),               description: "Foot pedal accelerator for ride-on cars. Press to go, release to stop." },
  { name: "Bike Hand Accelerator",        category: "bike", img: image("bike_hand_accelerator.png"),            description: "Twist-grip throttle handle for electric bikes. Compatible with most 6V–24V motor controllers." },
  { name: "Carburetor",                   category: "bike", img: image("carburetor.png"),                       description: "Toy bike carburetor part — decorative or functional replacement for specific petrol-look ride-on models." },
  // Music Boards
  { name: "Music Board",                  category: "music", img: image("music_board.jpg"),                     description: "Toy music control board with pre-loaded engine sounds, horn, and music playback over speaker." },
  { name: "Music Board (Black)",          category: "music", img: image("music_black.jpg"),                     description: "Black-PCB music board variant with USB and SD card support for custom audio on ride-on toys." },
  { name: "Round Music Board",            category: "music", img: image("roundmusic_3.jpg"),                    description: "Circular music board with centre speaker mount. Compact design for smaller ride-on vehicles." },
  { name: "Round Music Board V5",         category: "music", img: image("roundmusic_board5.jpg"),               description: "Version 5 round music board with enhanced audio chip and Bluetooth connectivity support." },
  { name: "LED Music Board",              category: "music", img: image("music_board_led.png"),                 description: "Music board with integrated LED control outputs for synchronized lights and sound effects." },
  { name: "Round Music Board USB",        category: "music", img: image("round_music_usb.png"),                 description: "Round music board with USB port for playing MP3 files from a USB drive on ride-on toys." },
  { name: "Music Control Panel",          category: "music", img: image("music_control_panel.png"),             description: "Dashboard-mounted music control panel with play, skip, volume, and horn buttons for kids' cars." },
  // Chargers
  { name: "Big Charging Circuit",         category: "charger", img: image("bigcharging_circuit.jpg"),           description: "High-capacity charging circuit board for 12V/24V sealed lead-acid batteries in ride-on toys." },
  { name: "Small Charging Circuit",       category: "charger", img: image("smallcharging_circuit.jpg"),         description: "Compact charging circuit for 6V SLA batteries. Built-in overcharge protection." },
  { name: "12V Charger",                  category: "charger", img: image("12v_charger.jpg"),                   description: "Wall-plug 12V DC charger for ride-on car batteries. Auto cut-off when fully charged." },
  { name: "Battery Charger",              category: "charger", img: image("battery_charger.png"),               description: "Universal battery charger for 6V and 12V toy car batteries. LED charge indicator included." },
  { name: "Petrol Bike Charger",          category: "charger", img: image("petrol_bike_charger.png"),           description: "Charger designed for petrol-look electric bikes with standard 3-pin barrel connector." },
  { name: "Dirt Bike Charger",            category: "charger", img: image("dirt_bike_charger.png"),             description: "Dedicated charger for dirt bike style ride-on toys. 12V with trickle charge final stage." },
  { name: "Scooter Charger Adapter",      category: "charger", img: image("scooter_charger_adapter.png"),       description: "Charging adapter for electric scooters with specific barrel or round-pin connector types." },
  // Batteries
  { name: "Battery Pack",                 category: "battery", img: image("battery_pack.png"),                  description: "Pre-assembled SLA battery pack for direct swap into compatible ride-on car models." },
  { name: "Battery Clips",                category: "battery", img: image("battery_clips.png"),                 description: "Heavy-duty battery terminal clips and connectors for securing battery leads in ride-on toys." },
  { name: "Panja Set",                    category: "battery", img: image("panja_set.png"),                     description: "5-finger panja connector set for battery-to-board wiring in ride-on cars. Secure crimp fit." },
  { name: "20A Fuse",                     category: "battery", img: image("fuse_20a.png"),                      description: "20 Amp blade fuse for short-circuit protection in 12V/24V ride-on vehicle power circuits." },
  { name: "12V 7.5Ah Battery",            category: "battery", img: image("battery_12v_7ah.png"),               description: "12V 7.5Ah sealed lead-acid (SLA) VRLA battery — standard replacement for most ride-on cars." },
  { name: "6V 4.5Ah VRLA Battery",        category: "battery", img: image("battery_6v_4ah.png"),                description: "6V 4.5Ah VRLA battery for smaller ride-on cars and baby quad bikes. Maintenance-free." },
  { name: "18650 2200mAh Cell",           category: "battery", img: image("battery_18650_2200mah.png"),         description: "18650 Li-ion rechargeable cell (2200mAh) for custom battery pack builds and power banks." },
  { name: "32700 LiFePO4 Cells",          category: "battery", img: image("battery_32700_lifepo4.png"),         description: "32700 LiFePO4 cylindrical cells — high cycle life, safe chemistry for DIY eBike packs." },
  { name: "18650 Li-ion Cell",            category: "battery", img: image("battery_18650_samsung.png"),         description: "Samsung 18650 Li-ion cell with high discharge rating. Ideal for performance battery builds." },
  // Speakers
  { name: "Speaker",                      category: "speaker", img: image("speaker.jpg"),                       description: "Standard round speaker for ride-on toy music boards. 4Ω, 3W output for clear audio." },
  { name: "Speaker V2",                   category: "speaker", img: image("speaker_2.jpg"),                     description: "Upgraded speaker with improved bass response for ride-on car music and sound systems." },
  { name: "Big Speaker",                  category: "speaker", img: image("big_speaker.jpg"),                   description: "Large-diameter speaker for louder audio output in bigger ride-on vehicles and go-karts." },
  // Switches & Keys
  { name: "Key Set",                      category: "switch", img: image("key_set1.jpg"),                       description: "Ignition key set for ride-on cars. Includes key barrel and two matching keys for power on/off." },
  { name: "Power Button",                 category: "switch", img: image("power_button.png"),                   description: "Latching push-button power switch for ride-on vehicle main power circuit." },
  { name: "Direction Switch",             category: "switch", img: image("direction_switch.png"),               description: "3-position direction switch (Forward/Off/Reverse) for ride-on car gear selection." },
  { name: "Round Rocker Switch",          category: "switch", img: image("round_rocker_switch.png"),            description: "Circular rocker switch for panel mounting in ride-on dashboards and scooter controls." },
  { name: "BMW Model Switch",             category: "switch", img: image("bmw_model_switch.png"),               description: "BMW-logo style ignition switch for compatible ride-on car models. OEM style fit." },
  // Wiring
  { name: "Normal Wiring Set",            category: "wiring", img: image("wiring_set.png"),                     description: "Standard wiring harness set for ride-on cars. Includes main loom connectors and terminals." },
  { name: "Multi Wiring Set",             category: "wiring", img: image("multi_wiring_set.png"),               description: "Complete multi-wire harness kit for full electrical replacement in ride-on toy vehicles." },
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
    window.open(`https://wa.me/916204594205?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <Reveal>
      <div
  id="request-part"
  className="mt-20 max-w-xl mx-auto rounded-3xl border border-orange-200/60 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-8"
>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_6px_20px_rgba(249,115,22,0.25)]">
           <PackageSearch className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
  Can't find your part?
</h2>
           <p className="text-sm text-slate-800 font-medium">
  Tell us what you need — we'll source it for you.
</p>
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
                <label className="text-sm font-semibold text-slate-900">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="shiva"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-900">WhatsApp Number</label>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-900">Toy Model / Brand (optional)</label>
              <input
                value={form.model}
                onChange={set("model")}
                placeholder="e.g. BMW X5 ride-on, Lamborghini 12V"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-900">Part You Need *</label>
              <textarea
                required
                rows={3}
                value={form.part}
                onChange={set("part")}
                placeholder="e.g. 12V motherboard for remote-controlled Jeep, steering motor for bike..."
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              <Send className="h-4 w-4" /> Send Request on WhatsApp
            </button>
          </form>
        )}
      </div>
    </Reveal>
  );
}

type MobilePreview = { name: string; description: string; img: string; status: string } | null;

function Catalog() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [showFloater, setShowFloater] = useState(false);
  const [mobilePreview, setMobilePreview] = useState<MobilePreview>(null);

  useEffect(() => {
    const onScroll = () => setShowFloater(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("request-part")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Spare Parts</div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold">
                All <span className="text-orange-500">Spare Parts</span>
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
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white/90 flex items-center justify-center p-2">
                  <img src={p.img} alt={p.name} loading="eager" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  {/* Desktop hover description overlay */}
                  <div className="pointer-events-none absolute inset-0 hidden sm:flex flex-col justify-end rounded-xl bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 pb-3.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-[10px] leading-relaxed line-clamp-5">{p.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-1 pt-3">
                  <h3 className="text-sm font-bold leading-tight text-white drop-shadow-md">
  {p.name}
</h3>
                  <div className="mt-1 text-xs font-semibold text-orange-400">
  In Stock
</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="sm:hidden flex items-center justify-center rounded-lg border border-border bg-surface-elevated h-8 w-8 text-muted-foreground hover:text-brand shrink-0 transition-colors"
                    onClick={() => setMobilePreview({ name: p.name, description: p.description, img: p.img, status: "In Stock" })}
                    aria-label="Quick view"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => window.open(waEnquiry(p.name, p.description, p.img), "_blank")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No parts match your search.</p>
          )}
        </div>

        {/* ── DIY Projects Section ───────────────────────────── */}
        <div id="diy-projects" className="mt-24 border-t border-border pt-20 bg-surface/20">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Build &amp; Create</div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
                  DIY <span className="text-gradient-brand">Projects</span> Kit
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Everything you need to build your own robots, vehicles, and electronics projects — available individually.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {diyItems.map((item, i) => (
                <div
                  key={item.name}
                  className="group flex flex-col rounded-2xl border border-border bg-gradient-card p-3 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 animate-fade-in"
                  style={{ animationDelay: `${(i % 10) * 50}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white/90 flex items-center justify-center p-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Desktop hover description overlay */}
                    <div className="pointer-events-none absolute inset-0 hidden sm:flex flex-col justify-end rounded-xl bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-2.5 pb-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white/90 text-[9px] leading-relaxed line-clamp-5">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-1 pt-2 pb-1">
                    <h3 className="text-xs font-bold leading-tight text-white drop-shadow-md">
  {item.name}
</h3>
                    <div className="mt-0.5 text-[10px] font-semibold text-orange-400">
  Available
</div>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    <button
                      className="sm:hidden flex items-center justify-center rounded-lg border border-border bg-surface-elevated h-7 w-7 text-muted-foreground hover:text-brand shrink-0 transition-colors"
                      onClick={() => setMobilePreview({ name: item.name, description: item.description, img: item.img, status: "Available" })}
                      aria-label="Quick view"
                    >
                      <Info className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => window.open(waEnquiry(item.name, item.description, item.img), "_blank")}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-brand px-2 py-1.5 text-[10px] font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
                    >
                      <MessageCircle className="h-3 w-3" /> Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <RequestPartForm />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />

      {/* ── Mobile Quick Preview Bottom Sheet ─────────────────── */}
      {mobilePreview && (
        <div
          className="fixed inset-0 z-[60] sm:hidden flex flex-col justify-end"
          onClick={() => setMobilePreview(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative rounded-t-3xl border-t border-border bg-[oklch(0.18_0.024_255)] p-6 animate-sheet-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border/60" />
            <div className="flex items-start gap-4 mb-5">
              <div className="w-20 h-20 rounded-2xl bg-white/90 flex items-center justify-center p-2 shrink-0 border border-border">
                <img src={mobilePreview.img} alt={mobilePreview.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base leading-tight">{mobilePreview.name}</h3>
                <div className="mt-1.5 text-xs font-semibold text-brand">{mobilePreview.status}</div>
              </div>
              <button
                onClick={() => setMobilePreview(null)}
                className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-surface-elevated text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{mobilePreview.description}</p>
            <button
              onClick={() => {
                window.open(waEnquiry(mobilePreview.name, mobilePreview.description, mobilePreview.img), "_blank");
                setMobilePreview(null);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-glow"
            >
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        onClick={scrollToForm}
        aria-label="Can't find your part?"
        className={`fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full border border-brand/40 bg-surface-elevated px-4 py-2.5 text-xs font-semibold text-brand shadow-card backdrop-blur transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:border-transparent hover:shadow-glow ${
          showFloater ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <PackageSearch className="h-4 w-4 shrink-0" />
        Can't find your part?
      </button>
    </div>
  );
}
