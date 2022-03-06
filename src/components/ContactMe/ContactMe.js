import styles from "./ContactMe.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

const paths = [
  `M17.303,14.365c0.012-0.015,0.023-0.031,0.031-0.048v0.048H17.303z M32,0v32H0V0H32L32,0z M9.925,12.285H5.153v14.354
  h4.772V12.285z M10.237,7.847c-0.03-1.41-1.035-2.482-2.668-2.482c-1.631,0-2.698,1.072-2.698,2.482
  c0,1.375,1.035,2.479,2.636,2.479h0.031C9.202,10.326,10.237,9.222,10.237,7.847z M27.129,18.408c0-4.408-2.355-6.459-5.494-6.459
  c-2.531,0-3.664,1.391-4.301,2.368v-2.032h-4.77c0.061,1.346,0,14.354,0,14.354h4.77v-8.016c0-0.434,0.031-0.855,0.157-1.164
  c0.346-0.854,1.132-1.746,2.448-1.746c1.729,0,2.418,1.314,2.418,3.246v7.68h4.771L27.129,18.408L27.129,18.408z`,
  "M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z",
  `M27.56,0.684H2.383C1.065,0.684,0,1.748,0,3.064v23.813c0,1.312,1.065,2.379,2.383,2.379H27.56
  c1.312,0,2.38-1.066,2.38-2.379V3.064C29.939,1.748,28.871,0.684,27.56,0.684z M20.125,9.167c-0.619-0.362-1.11-0.648-1.727-0.648
  c-0.604,0-1.12,0.151-1.384,0.405c-0.264,0.252-0.395,0.74-0.395,1.461v1.067h3.229l-0.699,2.968h-2.53v9.862h-4.056V14.42H10.67
  v-2.968h1.895v-1.133c0-1.193,0.143-1.907,0.425-2.496c0.281-0.587,0.826-1.241,1.584-1.611c0.757-0.369,1.877-0.555,3.036-0.555
  c1.188,0,2.116,0.396,3.254,0.715L20.125,9.167z`,
  `M32 6v20c0 1.135-0.865 2-2 2h-2v-18.151l-12 8.62-12-8.62v18.151h-2c-1.135 0-2-0.865-2-2v-20c0-0.568 0.214-1.068 0.573-1.422 0.359-0.365 0.859-0.578 1.427-0.578h0.667l13.333 9.667 13.333-9.667h0.667c0.568 0 1.068 0.214 1.427 0.578 0.359 0.354 0.573 0.854 0.573 1.422z`,
];

const socials = [
  `https://linkedin.com/in/martin-pandarski`,
  `https://github.com/martinPandarski`,
  `https://www.facebook.com/martinPandarski/`,
  `mailto:marto65481@gmail.com`,
];

export default function ContactMe() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    <motion.ul
      ref={ref}
      className={styles.container}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {socials.map((social, i) => (
        <motion.li
          key={i}
          className={styles.item}
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open(social, "_blank")}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
            viewBox="0 0 30 30"
            width="90px"
            height="90px"
          >
            <motion.path
              d={paths[i]}
              variants={icon}
              initial="hidden"
              animate={controls}
              transition={{
                default: { duration: 2, ease: "easeInOut" },
                fill: { duration: 2, ease: [1, 0, 0.8, 1] },
              }}
            />
          </motion.svg>
        </motion.li>
      ))}
    </motion.ul>
  );
}
