"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="py-28 mt-10 px-4 sm:px-6 lg:px-4">
      <div className="max-w-2xl grid items-center justify-start text-wrap mx-auto prose">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=""
        >
          <div className="font-bold text-3xl text-black/90">About</div>
          <p>
            I’m an AI Engineer with a strong focus on building real-world systems using large language models, RAG pipelines, and agent-based architectures. With hands-on experience designing and deploying production-ready AI solutions, I enjoy turning complex ideas into scalable, practical applications.
          </p>
          <p className="mt-2">
            I’ve worked on end-to-end AI products, from data ingestion and retrieval to API development and deployment. My work combines LLM engineering, backend systems, and performance optimization, with a constant focus on improving accuracy, reducing latency, and delivering reliable results.
          </p>
          <p className="mt-2">
            I’m driven by fast iteration, solving meaningful problems, and building AI systems that create real impact. I’m continuously exploring new advancements in the AI space and pushing myself to build better, smarter systems.
          </p>
          <p className="mt-2">
            I’m also actively building my presence in the tech community. With
            over <strong>4K followers on LinkedIn, </strong>
            I’ve learned and connected with top minds and mentors.
            Their guidance and content have helped shape how I think about
            product-building, growth, and shipping fast.
          </p>
        </motion.div>
      </div>

      <Link
        href="https://www.linkedin.com/in/uzair-afridi00/"
        target="_blank"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mt-10 px-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="py-2 px-3 bg-white shadow-sm rounded-sm w-fit"
          >
            <Image
              src="/img/profile-pic.png"
              width={200}
              height={200}
              alt="profile image"
              className="rounded-sm bg-white w-full max-w-[200px]"
            />
            <span className="text-sm block text-center mt-1 text-gray-800">
              @uzairafridi00
            </span>
          </motion.div>
        </motion.div>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="flex justify-center mt-6 px-4"
      >
        <Button className="!bg-black/90 text-white !cursor-pointer !py-4 !px-6 hover:!bg-black/82">
          <a href="#contact" aria-label="Contact for collaboration">
            Let&apos;s collaborate!
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default About;
