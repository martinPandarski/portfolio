import { Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { items } from '../../utils/jobs'
import '../../styles/styles.css'




function ExperienceCard({ id, title, occupation, theme }) {
    return (

        <li className={`card ${theme}`} >
            <div className={"card-content-container"}>
                <motion.div className={"card-content"} layoutId={`card-container-${id}`}>
                    <motion.div className={"card-image-container"} layoutId={`card-image-container-${id}`}>
                        <img className={"card-image"} src={`/images/${id}.jpg`} alt={title} width={'550px'} height={'400px'} />
                    </motion.div>
                    <motion.div className={"title-container"} layoutId={`title-container-${id}`}>
                        <Typography className={`occupation`} variant='span'>{occupation}</Typography>
                        <Typography className={`title`} variant='h4'>{title}</Typography>
                    </motion.div>
                </motion.div>
            </div>
            <Link to={id} className={`card-open-link`} />
        </li>

    )
}


export function List({ selectedId }) {
    return (
        <ul className={"card-list"}>
            {items.map(card => (
                <ExperienceCard key={card.id} {...card} isSelected={card.id === selectedId} />
            ))}
        </ul>
    )
}