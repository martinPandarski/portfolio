import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import styles from "./Index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { useRef } from "react";
import ExperienceList, { List } from "../ExperienceList/ExperienceList";
import { Item } from "../Item/Item";
import { useParams } from "react-router-dom";
import ContactMe from "../ContactMe/ContactMe";

export default function Index() {
    const { id } = useParams();
    const imageIsLoaded = true;
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
                    <Toolbar>
                        <p>Asd</p>
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
                            <Typography variant="h3">Martin Pandarski</Typography>
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
                        {/* <AnimatePresence>
                            {id && imageIsLoaded && <Item id={id} key={"item"} />}
                        </AnimatePresence> */}
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
                    <ContactMe />
                </div>
            </AnimatePresence>
        </>
    );
}
