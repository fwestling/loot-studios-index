import React from "react";
import { DecoratedMini } from "../data/loot.types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import Cancel from "@mui/icons-material/Close";
import ArrowRight from "@mui/icons-material/ArrowRight";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

interface IPagerContext {
  // page: number;
  // pages: DecoratedMini[];
  open: (page: number, pages: DecoratedMini[]) => void;
  close: () => void;
}

export const PagerContext = React.createContext<IPagerContext>({
  open: () => console.warn("Not implemented!"),
  close: () => console.warn("Not implemented!"),
});

interface PagerProviderProps {
  children: React.ReactNode;
}

const PagerProvider = ({ children }: PagerProviderProps) => {
  const [page, setPage] = React.useState<number>(0);
  const [pages, setPages] = React.useState<DecoratedMini[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = React.useCallback((page: number, pages: DecoratedMini[]) => {
    setPage(page);
    setPages(pages);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PagerContext.Provider value={{ open, close }}>
      {children}
      <Modal
        open={isOpen}
        onClose={close}
        sx={(theme) => ({ padding: "auto" })}
      >
        <Paper
          sx={(theme) => ({
            backgroundColor: "black",
            height: "90vh",
            width: "90vw",
            margin: "auto",
          })}
        >
          <IconButton
            sx={{ position: "absolute", right: 4, top: 4 }}
            onClick={close}
          >
            <Cancel />
          </IconButton>

          {page > 0 ? (
            <Fab
              sx={{ position: "absolute", left: 4, bottom: 4 }}
              variant="circular"
              color="primary"
              onClick={() => setPage(Math.max(page - 1, 0))}
            >
              <ArrowLeft />
            </Fab>
          ) : null}
          <a href={pages[page]?.loot.url} target="_blank" rel="noreferrer">
            <Box
              component="img"
              src={pages[page]?.img}
              alt={pages[page]?.iname}
              width="100%"
              height="100%"
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </a>
          {page < pages.length - 1 ? (
            <Fab
              sx={{ position: "absolute", right: 4, bottom: 4 }}
              variant="circular"
              color="primary"
              onClick={() => setPage(Math.min(page + 1, pages.length - 1))}
            >
              <ArrowRight />
            </Fab>
          ) : null}
        </Paper>
      </Modal>
    </PagerContext.Provider>
  );
};

export default PagerProvider;
