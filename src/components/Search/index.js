//components/Search/index.js

import React, { useState, useEffect } from 'react'
import { Link } from "gatsby"
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  SearchBox, 
  Hits,
  Highlight,
  Pagination,
  PoweredBy,
  Snippet
} from 'react-instantsearch-dom';
import './Search.css'

const algoliaClient = algoliasearch(
   '08KGTEC7TF', 'd2ce6938b07004127250631c5abc5787'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

const Hit = ({ hit }) => ( 
    <div className="card">
        <div className="card-contents">
            <Link href={"https://smile-0yen.dev/" + hit.slug + "/"} >
                <Highlight attribute="title" hit={hit} className="card-title" />
            </Link>
            <Snippet tagName="mark" attribute="plaintext" hit={hit}  className="card-year"/>
            <div className="card-tag"> <span>{hit.name}</span></div>
        </div>
    </div>    
);

const Search = () => {
    return (
        <>
        <InstantSearch
            searchClient={searchClient}
            indexName="smile-0yen.dev"
        >
            <header className="header">
                <SearchBox
                    className="search-bar"
                    translations={{ placeholder: 'Search' }}
                    onKeyUp={(event) => {
                        event.preventDefault();
                    }}
                />
                <PoweredBy />
            </header>
            <Hits hitComponent={Hit} />
        </InstantSearch>
        </>
    )
}

export default Search
