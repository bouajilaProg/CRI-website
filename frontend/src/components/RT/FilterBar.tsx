function FilterBar() {
  return (
    <div className="flex-1 shadow-black">
      <div className="card card-side bg-base-100 rounded-none border-b my-2 sm:w-full">
        <form className="card-body">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-semibold text-white drop-shadow-lg">Filters</h2>
          </div>
          <div className="border border-slate-200 rounded-lg mb-4">
            <div className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">Category</div>
              <div className="collapse-content flex flex-col">
                <label className="cursor-pointer label">
                  <span className="label-text">Pizza</span>
                  <input
                    type="checkbox"
                    name="category"
                    value="pizza"
                    id="pizza"
                    className="checkbox"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg mb-4">
            <div className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">Available</div>
              <div className="collapse-content flex flex-col">
                <label className="cursor-pointer label">
                  <span className="label-text">Yes</span>
                  <input
                    type="checkbox"
                    name="available"
                    value="yes"
                    id="available-yes"
                    className="checkbox"
                    defaultChecked
                  />
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text">No</span>
                  <input
                    type="checkbox"
                    name="available"
                    value="no"
                    id="available-no"
                    className="checkbox"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg mb-4">
            <div className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">Type</div>
              <div className="collapse-content flex flex-col">
                <label className="cursor-pointer label">
                  <span className="label-text">Single Item</span>
                  <input
                    type="checkbox"
                    name="type"
                    value="single-item"
                    id="single-item"
                    className="checkbox"
                  />
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text">Project Pack</span>
                  <input
                    type="checkbox"
                    name="type"
                    value="project-pack"
                    id="project-pack"
                    className="checkbox"
                  />
                </label>
              </div>
            </div>
          </div>

          <button className="btn">Apply Filters</button>
        </form>
      </div>
    </div>
  );
}

export default FilterBar;
