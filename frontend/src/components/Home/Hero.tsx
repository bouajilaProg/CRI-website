function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(cri.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-white text-center shadow-black">
        <div className="max-w-lg">
          <h1 className="mb-5 w-full text-6xl font-bold">Club Robotique Isimm</h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
