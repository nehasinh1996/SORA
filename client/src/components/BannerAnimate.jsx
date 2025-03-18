import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BannerAnimate = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Runs animation only once
    threshold: 0.2, // Triggers when 20% of the element is visible
  });

  return (
    <motion.img
      ref={ref}
      src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741445882/imgg_liutlg.jpg"
      alt="Banner"
      className="w-full mt-20"
      initial={{ scale: 0.8, opacity: 0 }} // Start small & invisible
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }} // Animate when in view
      transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
    />
  );
};

export default BannerAnimate;
