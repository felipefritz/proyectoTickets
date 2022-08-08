import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, search = "" }) {
  if (search.includes("?search=")) {
    search = search.split("?search=")[1].split("&")[0];
  }
  console.log(pages);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((i) => (
          <LinkContainer key={i + 1} to={`?search=${search}&page=${i + 1}`}>
            <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
