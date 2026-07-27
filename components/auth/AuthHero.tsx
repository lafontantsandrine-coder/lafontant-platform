import Image from 'next/image';

export default function AuthHero() {
  return (
    <section
      className="hidden lg:flex lg:min-h-screen lg:flex-col lg:justify-between relative overflow-hidden p-11 text-white"
      style={{
        backgroundImage:
          'radial-gradient(1200px 600px at 12% -8%, rgba(243,223,152,0.22) 0%, rgba(243,223,152,0) 58%), radial-gradient(900px 520px at 92% 108%, rgba(111,81,255,0.22) 0%, rgba(111,81,255,0) 62%), linear-gradient(135deg, #050816 0%, #0b1024 52%, #0b1024 100%)',
      }}
    >
      {/* Grid background effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'linear-gradient(#000,transparent)',
        }}
      />

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-3">
        <Image
          src="/uploads/images/lafontant-logo.png"
          alt="Lafontant"
          width={230}
          height={72}
          className="h-[72px] w-[230px] object-contain"
          priority
        />
      </div>

      {/* Visual copy */}
      <div className="relative z-10 max-w-[680px]">
        <span className="inline-flex text-[#f3df98] text-xs font-bold uppercase tracking-[0.14em]">
          Lafontant Learning Platform
        </span>
        <h1 className="font-serif text-[clamp(3.2rem,6vw,6.4rem)] leading-[0.95] tracking-[-0.045em] mt-[18px] mb-[22px]">
          Tu experiencia empieza aquí.
        </h1>
        <p className="text-lg leading-[1.75] text-[#c0c9d8]">
          Crea una ruta personalizada para aprender con claridad, práctica y acompañamiento.
        </p>
      </div>

      {/* Proof badges */}
      <div className="relative z-10 flex flex-wrap gap-[14px]">
        <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-[13px] py-[10px] text-xs text-[#dce2ed]">
          7 días gratis
        </span>
        <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-[13px] py-[10px] text-xs text-[#dce2ed]">
          Sin tarjeta
        </span>
        <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-[13px] py-[10px] text-xs text-[#dce2ed]">
          Acceso inmediato
        </span>
      </div>
    </section>
  );
}
