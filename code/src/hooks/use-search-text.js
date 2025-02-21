import { useNodesSelector } from "./use-selector";

const { CHANGE_SEARCH_TEXT } = require("@reducers/nodes.reducer");
const { useDispatch } = require("react-redux");

const useSearchText = () => {
  const dispatch = useDispatch();
  const { searchText } = useNodesSelector();
  const onSearchTextChange = (text) => {
    dispatch(CHANGE_SEARCH_TEXT(text));
  };
  return { onSearchTextChange, searchText };
};

export default useSearchText;
