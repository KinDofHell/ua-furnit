import { Dispatch, SetStateAction } from "react";

interface DataPaginateType {
  [key: string]: any;
}
interface PageClickEvent {
  selected: number;
  [key: string]: any;
}

export const Paginate = (
  data: DataPaginateType[],
  itemsPerPage: number,
  itemOffset: number
): [any, number] => {
  const endOffset: number = itemOffset + itemsPerPage;
  const currentItems: any = data.slice(itemOffset, endOffset);
  const pageCount: number = Math.ceil(data.length / itemsPerPage);

  return [currentItems, pageCount];
};

export const handlePageClick = (
  event: PageClickEvent,
  setItemOffset: Dispatch<SetStateAction<number>>,
  itemsPerPage: number,
  dataLength: number
) => {
  const newOffset = (event.selected * itemsPerPage) % dataLength;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
  window.scrollTo(0, 0);
};
