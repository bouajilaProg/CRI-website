import { ChangeEvent, useState } from "react";

function FilterBar({ categorySetter, availabilitySetter, categories }: {
  categorySetter: (category: string[]) => void;
  availabilitySetter: (availability: boolean) => void;
  categories: string[];
}) {
  const [category, setCategory] = useState([] as string[]);
  const [available, setAvailable] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    availabilitySetter(available);
    categorySetter(category);
  }

  function handleCategory(e: ChangeEvent<HTMLInputElement>) {
    console.log("category:" + category);
    const value = (e.target as HTMLInputElement).value;
    let tempCategory = [...category];

    if (category.includes(value)) {
      tempCategory = category.filter((c) => c !== value);
    } else {
      tempCategory.push(value);
    }
    setCategory(tempCategory);
  }

  function handleAvailable(e: ChangeEvent<HTMLInputElement>) {
    const checked = (e.target as HTMLInputElement).checked;
    setAvailable(checked);
  }

  return (
    <div className="flex-1 shadow-black w-full">
      <div className="card card-side bg-base-100 rounded-none border-b md:border-b-0 my-2 sm:w-full">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-semibold text-white drop-shadow-lg">
              Filters
            </h2>
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
                      checked={category.includes(c)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg mb-4">
            <div className="collapse collapse-arrow">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Available
              </div>
              <div className="collapse-content flex flex-col">
                <label className="cursor-pointer label">
                  <span className="label-text">Yes</span>
                  <input
                    type="checkbox"
                    name="available"
                    value="yes"
                    id="available-yes"
                    className="checkbox"
                    checked={available}
                    onChange={handleAvailable}
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
