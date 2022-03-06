import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import styles from './NotifyModal.module.scss'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export default function NotifyModal({ handleClose, text }) {


    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                className={styles['modal-container']}
                initial="hidden"
                animate="visible"
                exit="exit">
                <p>The mobile version is under construction. For the best possible experience open the site on desktop</p>
                <img src="https://emoji.gg/assets/emoji/PepeHappy.png" width="64px" height="64px" alt="PepeHappy" />
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </motion.div>
        </Backdrop>
    )
}