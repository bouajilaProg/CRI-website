import { ChangeEvent, useState } from "react";

function FilterBar({ categorySetter, categories }: { categorySetter: (category: string[]) => void, categories: string[] }) {

  const [category, setCategory] = useState([] as string[]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const available = (e.currentTarget.elements.namedItem('available') as HTMLInputElement).value;
    console.log({ category, available });
  }


  function handleCategory(e: ChangeEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    const isChecked = (e.target as HTMLInputElement).checked;

    if (isChecked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((c) => c !== value));
    }
    categorySetter(category);
  }



  return (
    <div className="flex-1 shadow-black">
      <div className="card card-side bg-base-100 rounded-none border-b md:border-b-0 my-2 sm:w-full">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-semibold text-white drop-shadow-lg">Filters</h2>
          </div>
          {/* Category item */}
          <div className="border border-slate-200 rounded-lg mb-4">
            <div className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">Category</div>
              <div className="collapse-content flex flex-col">
                {categories.map((c, i) => (
                  <label key={i} className="cursor-pointer label">
                    <span className="label-text">{c}</span>
                    <input
                      type="checkbox"
                      name="category"
                      value={c}
                      className="checkbox"
                      onChange={handleCategory}
                    />
                  </label>))}
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


          <button className="btn">Apply Filters</button>
        </form>
      </div>
    </div>
  );
}

export default FilterBar;
