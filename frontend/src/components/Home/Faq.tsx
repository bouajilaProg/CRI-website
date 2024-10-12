
function Faq() {
  return (
    <>
      <h2 className="text-4xl font-bold my-8 mx-4 text-center bg-white">FAQ</h2>
      <div className="collapse collapse-arrow ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Dois-je connaître la robotique pour rejoindre ?</div>
        <div className="collapse-content">
          <p>Non, il vous suffit d’être motivé pour apprendre ! Le Club CRI est ouvert à tous, que vous soyez débutant ou que vous ayez un peu d'expérience. Notre communauté est solidaire, et vous trouverez de nombreuses occasions d'apprendre et de progresser aux côtés d'autres passionnés.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Que faire si je n'ai pas d'argent pour acheter des matériaux ?</div>
        <div className="collapse-content">
          <p>Si vous êtes inquiet pour les coûts, nous avons un programme appelé "RT" qui vous permet d'emprunter des matériaux pour l'apprentissage et les projets. Ainsi, vous pouvez vous concentrer sur votre éducation sans stress financier.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Qu'est-ce que je vais gagner en rejoignant ce club ?</div>
        <div className="collapse-content">
          <p>En rejoignant le Club CRI, vous vous connecterez avec des personnes partageant les mêmes idées, apprendrez lors de nos formations et participerez à des projets passionnants. C'est un excellent moyen d'améliorer vos compétences tout en vous amusant !</p>
        </div>
      </div>
    </>
  )
}

export default Faq
