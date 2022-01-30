import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import '../../styles/styles.css'
import { Typography } from "@mui/material";
import { items } from '../../utils/jobs'


export function Item({ id }) {
    const { occupation, title, description, current } = items.find(job => job.id === id);

    return (
        <>
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ pointerEvents: "auto" }}
                className="overlay">
                <Link to="/" />
            </motion.div>
            <div className={"card-content-container open"}>
                <motion.div className="card-content" layoutId={`card-container-${id}`}>
                    <motion.div className={"card-image-container"} layoutId={`card-image-container-${id}`}>
                        <img className={"card-image"} src={`/images/${id}.jpg`} alt='job' />
                    </motion.div>
                    <motion.div className={"title-container"} layoutId={`title-container-${id}`}>
                        <Typography className='occupation' variant='span'>{occupation}</Typography>
                        <Typography variant='h4'>{title}</Typography>
                    </motion.div>
                    <motion.div className={"content-container"} animate>
                        <p className='description'>{description}</p>
                        <img src={`https://emoji.gg/assets/emoji/${current ? '5498_catJAM.gif' : '1969-pepe-swag.png'}`} width="64px" height="64px" alt="pepeCool"></img>
                    </motion.div>
                </motion.div>
            </div></>
    )
}