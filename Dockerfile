# Use the PyTorch image as the base image
FROM nvidia/cuda:12.3.0-runtime-ubuntu22.04 as base_dev_env

# Install required dependencies
RUN apt-get update && \
    apt-get install -y sudo python3-pip gcc libstdc++6 ffmpeg libsm6 libxext6 libgl1-mesa-glx libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV TZ=Asia/Kolkata \
    DEBIAN_FRONTEND=noninteractive

# Set the working directory inside the container
WORKDIR /opt/ml/code

# Copy the requirements file into the container
# COPY requirements.txt .

# Install the Python dependencies
#RUN pip3 install --no-cache-dir -r requirements.txt

RUN pip3 install torch==1.11.0+cu113 torchvision==0.12.0+cu113 torchaudio==0.11.0 --extra-index-url https://download.pytorch.org/whl/cu113

# Copy the model_script and sagemaker_deploy files into the container
#COPY model_script.py .
#COPY sagemaker_deploy.py .
#COPY tiny_vit.py .

# Adjust the entry point to use the AWS Lambda handler (modify as needed)
#CMD ["python3", "sagemaker_deploy.py"]