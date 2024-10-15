
function SideMenu() {
  return (
    <div className='flex-1 shadow-black '>
      <div className='card card-side bg-base-100 rounded-none border-b my-2 sm:w-full '>
        <form className='card-body'>
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-semibold text-white drop-shadow-lg">send</h2>
          </div>
          <label htmlFor="OrderDate">Order Date</label>
          <input type="date" name='OrderDate' className="input input-bordered" placeholder="date" />
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
