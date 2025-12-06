import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function AlertModal({ open, handleClose, title, message }) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#161f20] hover:bg-[#002629]">
        <DialogHeader className=" text-[#d5d5d5]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TriangleAlert className="w-6 h-6 text-yellow-500" />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button onClick={handleClose} className="flex-1 bg-yellow-500 hover:bg-yellow-600">
            Tamam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}