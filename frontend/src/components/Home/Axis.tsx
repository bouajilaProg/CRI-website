import AxisItem from './AxisItem'

function Axis() {
  return (
    <>
      <h2 className="text-4xl font-bold my-8 mx-4 text-center">Nos axes</h2>
      <div className="join join-vertical md:join-horizontal flex justify-around w-full mt-8 gap-3">
        <AxisItem
          title="Family"
          description='CRI est plus qu’un simple club, c’est une véritable famille où chaque membre se soutient mutuellement. Ensemble, nous apprenons, créons et grandissons dans un environnement amical et collaboratif. Peu importe vos compétences, vous trouverez ici un espace où vous serez accueilli et encouragé à atteindre vos objectifs.'
        />
        <AxisItem
          title="Formation"
          description='Chez CRI, l’apprentissage est au cœur de nos activités. Nous proposons des formations variées sur la robotique, l’électronique, et le développement, adaptées aux débutants comme aux plus avancés. Notre objectif est de vous donner les compétences nécessaires pour transformer vos idées en projets concrets.'
        />
        <AxisItem
          title="Competition"
          description='CRI participe activement à des compétitions nationales et internationales, mettant au défi les membres de repousser leurs limites. C’est l’opportunité parfaite pour appliquer vos connaissances, collaborer en équipe, et représenter fièrement notre club tout en développant vos compétences dans des environnements compétitifs.'
        />
      </div>
    </>
  )
}

export default Axis
