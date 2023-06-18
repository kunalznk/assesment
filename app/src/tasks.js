import { COLUMN_NAMES } from "./constants";

const {DO_IT, AWAITING_REVIEW,DONE,IN_PROGRESS} = COLUMN_NAMES;
export const tasks = [
    {id: 1, name: 'Item 1', column: DO_IT},
    {id: 2, name: 'Item 2', column: AWAITING_REVIEW},
    {id: 3, name: 'Item 3', column: DONE},
    {id: 4, name: 'Item 4', column: IN_PROGRESS},
];
