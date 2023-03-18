import { useCallback, useState } from "react";

type Page = {
  title: string;
  id: string;
};

function App() {
  const [pages, setPages] = useState<Page[]>([]);
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (event.currentTarget.files) {
        if (event.currentTarget.files?.length > 0) {
          const file = event.currentTarget.files[0];
          const text = await file.text();
          const json = JSON.parse(text);
          setPages(json.pages);
        }
      }
    },
    []
  );
  return (
    <div>
      <div>
        <label htmlFor="original" className="mr-2">
          Original:
        </label>
        <input
          type="file"
          onChange={onChange}
          id="original"
          accept=".json"
        ></input>
      </div>
      <div>
        {pages.map((page) => (
          <div key={page.id}>{page.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
