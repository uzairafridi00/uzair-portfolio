import React from "react";

function article_1() {
	return {
		date: "10 August 2024",
		title: "The Benefits of Cloud Computing",
		description:
			"Cloud computing offers a range of benefits, including cost savings and increased flexibility. Find out why more businesses are turning to the cloud.",
		keywords: [
			"The Benefits of Cloud Computing",
			"Cloud",
			"Cloud Services",
			"Cloud Benefits",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 1rem;
				}
				.randImage {
					margin-top: 20px;
					border-radius: 8px;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>What is Cloud Computing?</h2>
					<p>
						Cloud computing is the delivery of computing services
						like storage, servers, networking, software, and
						analytics over the internet. Instead of owning physical
						infrastructure, businesses rent resources from cloud
						providers such as AWS, Microsoft Azure, or Google Cloud.
					</p>

					<h2>Key Benefits</h2>
					<ul>
						<li>
							<strong>Cost Savings:</strong> No need to buy or maintain
							expensive hardware. You only pay for what you use.
						</li>
						<li>
							<strong>Scalability:</strong> Easily scale up or down depending
							on demand. This is especially useful for businesses with
							seasonal workloads.
						</li>
						<li>
							<strong>Flexibility:</strong> Access resources from anywhere in
							the world with an internet connection.
						</li>
						<li>
							<strong>Security & Reliability:</strong> Cloud providers offer
							robust data backup and disaster recovery options.
						</li>
					</ul>

					<h2>Real-World Applications</h2>
					<p>
						Cloud computing supports services like Netflix streaming,
						Dropbox file storage, online banking systems, and even
						healthcare data management. It has become the backbone
						of digital transformation.
					</p>

					<img
						src="https://picsum.photos/600/300"
						alt="Cloud Computing"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "7 Dec 2024",
		title: "Artificial Intelligence in Healthcare",
		description:
			"AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations. Discover the latest applications of this game-changing technology.",
		style: ``,
		keywords: [
			"Artificial Intelligence in Healthcare",
			"AI in Medicine",
			"Medical AI",
			"Healthcare Technology",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>Introduction</h2>
					<p>
						Artificial Intelligence (AI) is revolutionizing the
						healthcare sector by enabling faster, more accurate
						diagnosis, improving patient care, and optimizing
						hospital operations.
					</p>

					<h2>Key Applications</h2>
					<ul>
						<li>
							<strong>Medical Imaging:</strong> AI systems can analyze
							X-rays, MRIs, and CT scans to detect diseases such as
							cancer and pneumonia more accurately than humans in
							some cases.
						</li>
						<li>
							<strong>Predictive Analytics:</strong> AI models can
							predict patient readmissions, track disease outbreaks,
							and assist in early detection of chronic illnesses.
						</li>
						<li>
							<strong>Drug Discovery:</strong> AI speeds up the
							development of new drugs by simulating how different
							molecules interact.
						</li>
						<li>
							<strong>Virtual Health Assistants:</strong> AI chatbots
							help patients with basic medical queries, appointment
							scheduling, and medication reminders.
						</li>
					</ul>

					<h2>Challenges</h2>
					<p>
						Despite the benefits, challenges remain: ensuring patient
						data privacy, avoiding algorithmic bias, and integrating
						AI tools into traditional healthcare workflows.
					</p>

					<h2>Conclusion</h2>
					<p>
						AI in healthcare is still evolving, but it already shows
						enormous potential to improve lives, reduce costs, and
						make healthcare more accessible worldwide.
					</p>
				</div>
			</React.Fragment>
		),
	};
}


function article_3() {
	return {
		date: "25 July 2025",
		title: "Introduction to Deep Learning",
		description:
			"Deep Learning (DL) powers modern AI by using neural networks to learn patterns from data. It has transformed industries from vision to language.",
		style: ``,
		keywords: [
			"Deep Learning",
			"Neural Networks",
			"Machine Learning",
			"AI",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>What is Deep Learning?</h2>
					<p>
						Deep Learning is a subfield of Machine Learning that
						uses artificial neural networks with multiple layers
						to automatically extract features from raw data. Unlike
						traditional ML, DL reduces the need for manual feature
						engineering.
					</p>

					<h2>Applications</h2>
					<ul>
						<li>Computer Vision (image recognition, self-driving cars)</li>
						<li>Natural Language Processing (translation, sentiment analysis)</li>
						<li>Speech Recognition (voice assistants, transcription)</li>
					</ul>

					<h2>Why it matters?</h2>
					<p>
						The ability of deep networks to scale with data and
						compute has made DL the backbone of modern AI systems,
						enabling breakthroughs like GPT, AlphaFold, and
						autonomous driving.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

function article_4() {
	return {
		date: "10 Aug 2025",
		title: "Large Language Models Explained",
		description:
			"Large Language Models (LLMs) like GPT-4 and LLaMA use billions of parameters to understand and generate human-like text.",
		style: ``,
		keywords: [
			"Large Language Models",
			"LLM",
			"GPT",
			"Generative AI",
			"NLP",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>What are LLMs?</h2>
					<p>
						Large Language Models are deep neural networks trained
						on massive text datasets. They learn grammar, facts, and
						reasoning patterns, allowing them to generate coherent
						and context-aware text.
					</p>

					<h2>Key Features</h2>
					<ul>
						<li>Text generation and summarization</li>
						<li>Question answering and reasoning</li>
						<li>Code generation and debugging</li>
					</ul>

					<h2>Impact</h2>
					<p>
						LLMs are transforming industries: automating content
						creation, assisting in programming, enhancing customer
						support, and even accelerating scientific research.
					</p>

					<h2>Challenges</h2>
					<p>
						Despite their power, LLMs raise concerns such as bias,
						energy consumption, and hallucinations. Responsible
						usage and fine-tuning are essential for safe deployment.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2, article_3, article_4];

export default myArticles;