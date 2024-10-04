interface AxisItemProps {
  title: string
  description: string
}

function AxisItem({ title, description }: AxisItemProps) {

  return (
    <div className="card bg-base-100 w-96 shadow-xl join-item">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default AxisItem
