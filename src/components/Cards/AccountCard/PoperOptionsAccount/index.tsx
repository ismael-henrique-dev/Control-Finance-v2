import { useContext, useState } from "react"
import { Pencil, Settings2, Trash } from "lucide-react"
import { Actions, Container } from "../../GoalCard/SpeedDial/styles"
import { AccountsContext } from "../../../../contexts/accountsContext"
import { EditAccountModaL } from "../../../../pages/Accounts/EditAccountModal.tsx"
import { ButtonAdd } from "../styles"
import Popover from "@mui/material/Popover"

interface PopeoverOptionsAccountProps {
  accountId: string
}

export function PopeoverOptionsAccount({
  accountId,
}: PopeoverOptionsAccountProps) {
  const { deleteAccount } = useContext(AccountsContext)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const handleOpenModalEdit = () => setOpenModalEdit(true)
  const handleCloseModaEdit = () => setOpenModalEdit(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prevOpen) => !prevOpen)
  }

  const handlePopoverClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const handleClickEditTransaction = () => {
    handlePopoverClose()
    handleOpenModalEdit()
  }

  async function handleDeleteAccount() {
    console.log(accountId)
    await deleteAccount(accountId)
  }

  const handleClickDeleteTransaction = () => {
    handlePopoverClose()
    handleDeleteAccount()
  }

  return (
    <Container>
      <ButtonAdd onClick={handleClick}>
        <Settings2 color="#fff" />
      </ButtonAdd>
      <Popover
        id="click-popover"
        sx={{
          pointerEvents: "auto",
          ".MuiPopover-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Actions style={{ marginLeft: "0.3rem", marginTop: "3rem" }}>
          <button onClick={handleClickEditTransaction}>
            <Pencil />
          </button>
          <button onClick={handleClickDeleteTransaction}>
            <Trash />
          </button>
        </Actions>
      </Popover>
      <EditAccountModaL
        open={openModalEdit}
        handleClose={handleCloseModaEdit}
        AccountId={accountId}
      />
    </Container>
  )
}
