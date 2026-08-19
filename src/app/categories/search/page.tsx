import { Suspense } from "react";
import SearchResults from "./search-results";

export default function CategoriesSearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
