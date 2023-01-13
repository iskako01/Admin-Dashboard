import { SyntheticEvent, FC } from "react";
import { GridColDef, GridColumnMenuContainer, GridFilterMenuItem, HideGridColMenuItem } from "@mui/x-data-grid";

interface PropsInterface {
  hideMenu: (event: SyntheticEvent<Element, Event>) => void;
  currentColumn: GridColDef<any, any, any>
  openMenu: boolean
}

const DataGridCustomColumnMenu: FC<PropsInterface> = ({
  hideMenu,
  currentColumn,
  openMenu,
}) => {
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={openMenu}
    >
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />

    </GridColumnMenuContainer>
  );
};

export default DataGridCustomColumnMenu;
