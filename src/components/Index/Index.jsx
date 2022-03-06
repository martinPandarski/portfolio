import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, IconButton, Slide, Toolbar, Box, Button, Zoom, Fab } from "@mui/material";
import styles from "./Index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { useRef, useState, useEffect } from "react";
import ExperienceList from "../ExperienceList/ExperienceList";
import ContactMe from "../ContactMe/ContactMe";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useMediaQuery } from '@mui/material'
import NotifyModal from "../NotifyModal/NotifyModal";

function ScrollToTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (e) => {
        const anchor = (e.target.ownerDocument || document).querySelector("#back-to-top-anchor");
        if (anchor) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }

    return (
        <Zoom in={trigger}>
            <Box onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}>
                {children}
            </Box>
        </Zoom>
    )
}

export default function Index(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    const isMobile = useMediaQuery('(max-width:900px)');
    useEffect(() => {
        if (isMobile) {
            open();
        } else {
            close();
        }
    }, [isMobile]);
    const [isHovered, setIsHovered] = useState(false);
    const contactRef = useRef(null);
    const executeContactScroll = () =>
        contactRef.current.scrollIntoView({ behavior: "smooth" });

    const experienceRef = useRef(null);
    const executeScroll = () =>
        experienceRef.current.scrollIntoView({ behavior: "smooth" });
    const { ref, inView } = useInView({
        threshold: 0.8,
    });
    const appBarTrigger = useScrollTrigger();

    return (
        <>
            <Slide appear={false} direction="down" in={!appBarTrigger}>
                <AppBar sx={{ backgroundColor: '#202731' }}>
                    <Toolbar id="back-to-top-anchor">
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={executeScroll} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Check out my experience
                            </Button>
                            <Button onClick={executeContactScroll} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Contact me
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Toolbar />
            <AnimatePresence exitBeforeEnter initial={false}>
                <div className={styles["app-container"]}>
                    <div className={styles.hero}>
                        <motion.div
                            className={styles.hero__text}
                            ref={ref}
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : ""}
                            transition={{ duration: 1.75, bounce: 0.5 }}
                        >
                            <div className={styles['link-container']}>
                                <div
                                    className={styles['name-container']}
                                    onMouseOver={() => setIsHovered(true)}
                                    onMouseOut={() => setIsHovered(false)}  >
                                    {'Martin Pandarski'.split('').map((letter, i) => (
                                        <div className={styles['letter-container']} key={i}>
                                            <div>{letter}</div>
                                            <motion.div
                                                initial={{ left: "-100%" }}
                                                animate={{ left: isHovered ? '0%' : '-100%' }}
                                                transition={{
                                                    duration: isHovered ? .7 : .5,
                                                    ease: [.7, 0, .3, 1]
                                                }}>
                                                {letter.toUpperCase()}
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 1,
                                    x: { type: "spring", stiffness: 100 },
                                    default: { duration: 2 },
                                }}
                            >
                                Frontend Developer
                                <img
                                    src="https://emoji.gg/assets/emoji/5120-vibepepe.png"
                                    width="30px"
                                    height="30px"
                                    alt="vibepepe"
                                />
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 2,
                                x: { type: "spring", stiffness: 100 },
                                default: { duration: 2 },
                            }}
                        >
                            <IconButton id="check-experience" onClick={executeScroll}>
                                <ExpandCircleDownOutlinedIcon
                                    style={{ color: "#FFFFFF" }}
                                    fontSize="large"
                                />
                            </IconButton>
                        </motion.div>
                    </div>
                    <div className={styles["experience-container"]} ref={experienceRef}>
                        <ExperienceList />
                        <div className={styles["custom-shape-divider-bottom"]}>
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                    className={styles["shape-fill"]}
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles['contact-container']} ref={contactRef}>
                        <h2>Contact me</h2>
                        <ContactMe />
                    </div>
                </div>
            </AnimatePresence>
            <ScrollToTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollToTop>
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {modalOpen && <NotifyModal handleClose={close} />}
            </AnimatePresence>
        </>
    );
}
