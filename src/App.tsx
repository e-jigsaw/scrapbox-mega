import { useCallback, useMemo, useState } from "react";

type Page = {
  title: string;
  id: string;
};

type Project = {
  pages: Page[];
};

function App() {
  const [original, setOriginal] = useState<Project | null>(null);
  const [originalPagesMap, setOriginalPagesMap] = useState(
    new Map<string, Page>()
  );
  const [selected, setSelected] = useState(new Map<string, Page>());
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (event.currentTarget.files) {
        if (event.currentTarget.files?.length > 0) {
          const file = event.currentTarget.files[0];
          const text = await file.text();
          const json = JSON.parse(text);
          setOriginal(json);
          const map = new Map<string, Page>();
          json.pages.forEach((page: Page) => {
            map.set(page.id, page);
          });
          setOriginalPagesMap(map);
        }
      }
    },
    []
  );
  const [query, setQuery] = useState("");
  const textOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setQuery(event.currentTarget.value);
    },
    []
  );
  const candidate = useMemo(() => {
    const next = new Map<string, Page>();
    originalPagesMap.forEach((page, key) => {
      if (page.title.indexOf(query) > -1) {
        next.set(key, page);
      }
    });
    return next;
  }, [originalPagesMap, query]);
  return (
    <div className="grid grid-cols-3">
      <div>
        <div>
          <label htmlFor="original" className="block text-4xl text-center">
            Original
          </label>
          <div className="text-center">
            <input
              type="file"
              onChange={onChange}
              id="original"
              accept=".json"
            ></input>
          </div>
        </div>
        <div>
          {original &&
            original.pages
              .slice(0, 100)
              .map((page) => <div key={page.id}>{page.title}</div>)}
        </div>
      </div>
      <div>
        <h1 className="text-4xl text-center">Selected</h1>
        <label htmlFor="query" className="mr-2">
          Query:
        </label>
        <input
          type="text"
          value={query}
          onChange={textOnChange}
          className="border"
          id="query"
        ></input>
      </div>
      <div>dest</div>
    </div>
  );
}

export default App;
