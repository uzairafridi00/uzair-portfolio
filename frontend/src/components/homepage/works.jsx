import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./vite.svg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">JMM Technologies</div>
							<div className="work-subtitle">
								Software Engineer (ML)
							</div>
							<div className="work-duration">2024 - Present</div>
						</div>

						<div className="work">
							<img
								src="./vite.svg"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">DevMaze</div>
							<div className="work-subtitle">
								Machine Learning Engineer (Intern)
							</div>
							<div className="work-duration">2023 - 2024</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
