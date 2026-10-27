---
title: "Make AI Videos with Comfy UI: No GPU Needed"
description: "Learn how to create AI video content using Google Colab and Comfy UI without needing a GPU. This tutorial simplifies the technical process into easy steps, covering setup, troubleshooting, and custom workflows. Whether you prefer an open-source approach or a quicker solution with 10zebra, this guide provides everything you need to start generating AI videos from text prompts and images."
pubDate: "2024-04-25"
author: "Philip Meier"
authorRole: "Founder, 10zebra & Computational Neuroscientist"
authorAvatar: "/images/team/philip-meier.jpg"
image: "/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-hero.gif"
imageAlt: "Make AI Videos with Comfy UI: No GPU Needed"
category: "Workflows & Tutorials"
tags:
  - "ComfyUI"
  - "Tutorial"
  - "Art & Technology"
featured: false
draft: false
---

## People Are Making Awesome AI Video Content

It's a bit technical and very creative, and you can do it too. In this tutorial, I break it down into bite-sized steps. Some of it is a bit painful, but if you persist, you will get there. You need a Google account because you will use Colab to get access to the right hardware, which not everyone has. You can do everything in a browser.

If the open-source route is too heavy or technical for you, you can run this same workflow with two clicks on 10zebra. And if you want control of the guts, you can look to this open-source workflow to understand and control much more!

## Introduction to AI Video Creation Without a GPU

Here is the big idea: we will run open-source software in the cloud. We will open a tunnel from Colab to access Comfy's interface on your browser. We will use a custom workflow, which already has some good choices for models. There is a lot to install, so just persist on the defaults. Then you can create your own videos from images and text prompts. It may sound complicated, but it mostly requires patience to hit the "run cell" button and wait for the code to finish evaluating.

## Step-by-Step Guide to Setting Up Comfy UI

### 1. Open this Google Colab link:

- [https://colab.research.Google.com/drive/1SXQ-jC1dlPgHXV-uuw0St-2-elEJOSnv?usp=sharing](https://colab.research.google.com/drive/1SXQ-jC1dlPgHXV-uuw0St-2-elEJOSnv?usp=sharing)

### 2. Run Four Cells:

- Find a line that looks like this:

> "This is the URL to access ComfyUI: https://xxx-yyy-zzz.trycloudflare.com"

- open the newly printed out URL in a new browser window. It should look like this:
<div>

![Screenshot of the Google Colab interface showing the setup steps for Comfy UI](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-1.png)

</div>

### 3. Queue Prompt:

- Click "Queue Prompt" to confirm things are running. But we want a different workflow.

### 4. Upload Workflow File:

- Click upload and select this file:

> workflow.json

- You can try any workflow that you want. The example we show below is:

> AutoCinemagraph_V1_6.json.

- There will be missing nodes when it loads.
- After everything is installed, all the missing nodes will stop being red.
<div>

![Screenshot showing the setup process for Comfy UI using Json workflow](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-2.png)

</div>

### 5. Install Missing Custom Nodes:

- Click the "Manager" button.
<div>

![Screenshot showing the step to “click manager” when installing missing custom nodes in Comfy UI on Google Colab](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-3.png)

</div>

- Choose to Install missing custom nodes.
<div>

![Screenshot showing the step to install missing custom nodes in Comfy UI on Google Colab](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-4.png)

</div>

- First, click on all the items so they all have a check mark, then click "Install" on one of them. This will take a few minutes. Read a blog. Talk to a human.
- When it's done, restart the server.
<div>

![Screenshot instructing the user to restart the server](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-5.png)

</div>

### 6. Stop the Cloudflare Tunnel:

- Go back to Colab and stop the Cloudflare tunnel. You can click the stop icon in the upper left of this cell.
<div>

![Screenshot instructing the user to stop the Cloudflare tunnel in Google Colab](/src/assets/blogs/make-ai-videos-comfy-ui-no-gpu-inline-6.png)

</div>

If you were to continue here, you would start bumping into an error because you are missing some of the models. The error looks like this:

> [AnimateDiffEvo] - ERROR - No motion models found. Please download one and place in: ['/content/ComfyUI/custom_nodes/ComfyUI-AnimateDiff-Evolved/models', '/content/ComfyUI/models/animatediff_models']

You can fix it by running the cell right below. Follow the instructions in the cell to download and place the necessary motion models in the specified directories. This will ensure your workflow runs smoothly and without errors.

## Troubleshooting Common Errors

If you encounter any of the following errors, here are the steps to resolve them:

### A. "Error occurred when executing VAELoader: 'NoneType' object has no attribute 'lower'"

- You might notice this line appears below:

> "ckpt.lower().endswith('.safetensors')".

- To address this, ensure that the checkpoint file being loaded exists and is correctly referenced in your configuration.

### B. "Error occurred when executing  CheckpointLoaderSimple"

- Try finding the checkpoint in the drop-down menus and make sure it selects one that you have installed.
- The error message might look like this:

> "!!! Exception during processing!!! Weights only load failed."

### C. "CLIP Vision Model not found"

- Ensure the required model files are in the correct directory:

> /ComfyUI/models/clip_vision.

- Download and rename your clip model so that it matches the drop-down menu in comfy
- These commands are in the Google Colab notebook, using “wget”

### D. "IPAdapter model not found"

- You might be missing the IPAdapter model.
- In the ComfyUI Manager Menu, click "Install Models".
- Search for ip-adapter_sd15 and click "Install"

By following these steps, you can resolve common errors and ensure your AI video generation workflow runs smoothly. If additional issues arise, consult the community forums or the detailed documentation provided with the tools.

## FAQ

### Should I install Comfy in Google Drive?

This can save you time.  But model files get big. And the framework can stop working, so you have to reinstall fresh. It’s your call.

### Why is this so hard?

It’s open source.  It moves fast. The good parts will get easier.

### How can I run my custom workflow?

The collab workflow is free for anyone to try.  Go for it!  If you have something running locally or in a collab and want access to it on 10zebra, drop us a line and we’ll see what we can do.  Requests that include sample input, sample output,  a screenshot, and workflow.json tend to get priority.
