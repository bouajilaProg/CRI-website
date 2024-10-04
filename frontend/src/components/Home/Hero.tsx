function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(cri.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Club Robotique Isimm</h1>
          <p className="mb-5">
            CRI est un groupe des jeunes actifs doués par la conception et le développement robotique à l'ISIMM          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
