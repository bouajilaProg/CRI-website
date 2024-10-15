
function SideMenu() {
  return (
    <div className='flex-1 shadow-black '>
      <div className='card card-side bg-base-100 rounded-none border-b my-2 sm:w-full '>
        <form className='card-body'>
          <h2 className='card-title'>send </h2>
          <label htmlFor="returnDate">Return Date</label>
          <input type="date" name='ReturnDate' className="input input-bordered" placeholder="date" />
          <label htmlFor="reason">Reason of order</label>
          <textarea name='reason' className="textarea h-24 textarea-bordered" placeholder="Reason of order"></textarea>
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  )
}

export default SideMenu
