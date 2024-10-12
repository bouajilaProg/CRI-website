interface AxisItemProps {
  title: string
  description: string
}

function AxisItem({ title, description }: AxisItemProps) {

  return (
    <div className="card bg-base-100 shadow-xl join-item text-black">
      <div className="card-body">
        <h2 className="card-title text-black">{title}</h2>
        <p className="text-black">{description}</p>
      </div>
    </div>
  )
}

export default AxisItem
