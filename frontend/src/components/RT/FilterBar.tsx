function FilterBar() {
  return (
    <div className="flex-1 card-body p-0 mb-12">
      <div className="p-4 pr-8 md:m-15 mt-0 md:pt-0  ">
        <h2 className="text-2xl text-white p-4 bg-red-400 block rounded-t  ">Filters</h2>
        <div className="border border-slate-200 rounded-b border-t-0">
          <div className="rounded bg-slate-50 collapse collapse-arrow ">
            <input type="checkbox" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">Category</div>
            <div className="collapse-content flex flex-col">
              <ul className="list-none p-0 m-0">
                <div className="inline">
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
              </ul>
            </div>
          </div>

          <div className="rounded bg-slate-50 collapse collapse-arrow ">
            <input type="checkbox" name="my-accordion-2" />
            <div className="rounded bg-slate-50 collapse-title text-xl font-medium">Available</div>
            <div className="collapse-content flex flex-col">
              <div className="inline">
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
              </div>
              <div className="inline">
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

          <div className="rounded bg-slate-50 collapse collapse-arrow ">
            <input type="checkbox" name="my-accordion-2" />
            <div className="rounded bg-slate-50 collapse-title text-xl font-medium">Type</div>
            <div className="collapse-content flex flex-col">
              <div className="inline">
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
              </div>
              <div className="inline">
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
        </div>
      </div>
      <hr className="sm:mb-12 md:hidden" />
    </div>
  );
}

export default FilterBar;
