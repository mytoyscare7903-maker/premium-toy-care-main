import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const catalogJpg = import.meta.glob("../../assets/catalog/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const catalogPng = import.meta.glob("../../assets/catalog/*.png", { eager: true, import: "default" }) as Record<string, string>;

const image = (file: string) => {
  const jpg = catalogJpg[`../../assets/catalog/${file}`];
  if (jpg) return jpg;
  return catalogPng[`../../assets/catalog/${file}`];
};

const items = [
  { name: "Big Motherboard", img: image("big_mb1.jpg") },
  { name: "Small Motherboard", img: image("small_mb.jpg") },
  { name: "Motherboard with Remote", img: image("Mb_remote1.jpg") },
  { name: "Multifunctional Board", img: image("multifunctional_board.jpg") },
  { name: "Remote Controller", img: image("remote1.jpg") },
  { name: "Music Board", img: image("music_board.jpg") },
  { name: "Round Music Board", img: image("roundmusic_board5.jpg") },
  { name: "Hand Accelerator", img: image("hand_accelarator.jpg") },
  { name: "Steering Motor", img: image("stearing_motor.jpg") },
  { name: "Speaker", img: image("big_speaker.jpg") },
  { name: "12V Charger", img: image("12v_charger.jpg") },
  { name: "Key Set", img: image("key_set1.jpg") },
  { name: "Gearbox Motor 12V", img: image("gearbox_motor_12v.png") },
  { name: "Hoverboard Motherboard", img: image("hoverboard_motherboard.png") },
  { name: "Gear Shift Knob", img: image("gear_shift_knob.png") },
  { name: "HCD Motor Controller", img: image("hcd_controller.png") },
  { name: "Controller Box", img: image("gray_mb_box.png") },
  { name: "JR1721PWM Controller", img: image("jr1721pwm_controller.png") },
  { name: "Receiver & Transmitter", img: image("jr_receiver_transmitter.png") },
  { name: "12V 7-Pin Remote Set", img: image("remote_7pin_set.png") },
  { name: "Honghui Remote", img: image("honghui_remote.png") },
  { name: "Remote & Receiver Set", img: image("small_remote_set.png") },
  { name: "Dashboard Panel", img: image("dashboard_panel.png") },
  { name: "Normal Wiring Set", img: image("wiring_set.png") },
  { name: "LED Music Board", img: image("music_board_led.png") },
  { name: "Battery Pack", img: image("battery_pack.png") },
  { name: "Battery Charger", img: image("battery_charger.png") },
  { name: "Round Music Board USB", img: image("round_music_usb.png") },
  { name: "Speedometer Dashboard", img: image("speedometer_dashboard.png") },
  { name: "Music Control Panel", img: image("music_control_panel.png") },
  { name: "Power Button", img: image("power_button.png") },
  { name: "Bike Hand Accelerator", img: image("bike_hand_accelerator.png") },
  { name: "Panja Set", img: image("panja_set.png") },
  { name: "20A Fuse", img: image("fuse_20a.png") },
  { name: "Carburetor", img: image("carburetor.png") },
  { name: "Battery Clips", img: image("battery_clips.png") },
  { name: "Direction Switch", img: image("direction_switch.png") },
  { name: "Round Rocker Switch", img: image("round_rocker_switch.png") },
  { name: "BMW Model Switch", img: image("bmw_model_switch.png") },
  { name: "Petrol Bike Charger", img: image("petrol_bike_charger.png") },
  { name: "Electric Bike Controller", img: image("electric_bike_controller.png") },
  { name: "Dirt Bike Charger", img: image("dirt_bike_charger.png") },
  { name: "Scooter Motor Controller", img: image("scooter_motor_controller.png") },
  { name: "Motor Controller 24V", img: image("motor_controller_24v.png") },
  { name: "Multi Wiring Set", img: image("multi_wiring_set.png") },
  { name: "Scooter Charger Adapter", img: image("scooter_charger_adapter.png") },
  // DIY Components
  { name: "DC Motors",              img: image("diy2_dc_motors.jpg") },
  { name: "Gear Motors",            img: image("diy2_gear_motors.jpg") },
  { name: "Propeller Blades",       img: image("diy2_propeller_blades.jpg") },
  { name: "Propellers (4 Blade)",   img: image("diy2_propellers_4blade.jpg") },
  { name: "Rubber Tires",           img: image("diy2_rubber_tires.jpg") },
  { name: "LEDs (Assorted)",        img: image("diy2_leds_assorted.jpg") },
  { name: "Metal Connectors",       img: image("diy2_metal_connectors.jpg") },
  { name: "Plastic Bushes",         img: image("diy2_plastic_bushes.jpg") },
  { name: "Push Switches",          img: image("diy2_push_switches.jpg") },
  { name: "Screws & Bolts",         img: image("diy2_screws_bolts.jpg") },
  { name: "LDR Sensors",            img: image("diy2_ldr_sensors.jpg") },
  { name: "Buzzer",                 img: image("diy2_buzzer.jpg") },
  { name: "Connecting Wires",       img: image("diy2_connecting_wires.jpg") },
  { name: "Slide Switches",         img: image("diy2_slide_switches.jpg") },
  { name: "Rocker Switches",        img: image("diy2_rocker_switches.jpg") },
  { name: "Screwdriver & Cutter",   img: image("diy2_screwdriver_cutter.jpg") },
  { name: "Alligator Clips",        img: image("diy2_alligator_clips.jpg") },
  { name: "Jumper Wires",           img: image("diy2_jumper_wires.jpg") },
  { name: "Breadboard",             img: image("diy2_breadboard.jpg") },
  { name: "Jumper Cables",          img: image("diy2_jumper_cables.jpg") },
  { name: "9V Batteries & Snap",    img: image("diy2_9v_battery.jpg") },
  { name: "Battery Snap",           img: image("diy2_battery_snap.jpg") },
  { name: "Battery Holder",         img: image("diy2_battery_holder.jpg") },
  { name: "18650 Battery Cells",    img: image("diy2_18650_cells.jpg") },
  { name: "Wooden Sticks",          img: image("diy2_wooden_sticks.jpg") },
  { name: "Rubber Bands",           img: image("diy2_rubber_bands.jpg") },
  { name: "Plastic Wheels (Large)", img: image("diy2_wheels_large.jpg") },
  { name: "Resistors (Assorted)",   img: image("diy2_resistors.jpg") },
  { name: "Capacitors (Assorted)",  img: image("diy2_capacitors.jpg") },
  { name: "Diodes",                 img: image("diy2_diodes.jpg") },
  { name: "BO Motors",              img: image("diy2_bo_motors.jpg") },
  { name: "Caster Wheel",           img: image("diy2_caster_wheel.jpg") },
  { name: "Solar Panel",            img: image("diy2_solar_panel.jpg") },
  { name: "Robot Chassis",          img: image("diy2_robot_chassis.jpg") },
  { name: "Plastic Wheels (Small)", img: image("diy2_wheels_small.jpg") },
];

export function SpareCatalog() {
  return (
    <section id="catalog-preview" className="py-24 bg-surface/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Spare Parts</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Genuine <span className="text-gradient-brand">Spare Parts</span> Catalog
            </h2>
            <p className="mt-4 text-muted-foreground">
              Original parts for motherboards, remotes, batteries, gearboxes and more.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative bg-surface/20 py-3">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="catalog-marquee-track">
          {[0, 1].map((group) => (
            <div className="catalog-marquee-group" key={group} aria-hidden={group === 1}>
              {items.map((item, i) => (
                <div
                  key={`${group}-${item.name}`}
                  className="w-52 shrink-0 rounded-2xl border border-border bg-white p-3 shadow-[0_2px_12px_-4px_oklch(0.02_0_0/0.08)] hover:shadow-[0_6px_20px_-6px_oklch(0.02_0_0/0.13)] hover:-translate-y-0.5 hover:border-brand/20 transition-all duration-200 group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-surface to-white flex items-center justify-center p-3 border border-border/50 group-hover:border-brand/15 transition-colors">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading={group === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={group === 0 && i < 4 ? "high" : "auto"}
                      className="w-full h-full object-contain block transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-1 pt-3 pb-1">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Genuine Part</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/catalog" className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-105 transition-transform">
          Explore Full Catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
