pipeline {
    agent {ny  // Use the Jenkins host instead of a Docker container
        docker {
            image 'docker:dind'  // Use Docker-in-Docker image
            args '--privileged'  // Required for Docker-in-Docker
        }   steps {
    }           git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/iiprofit-conestoga/CICD-lab2'
            }
    stages {
        stage('Checkout') {
            steps {d & Test') {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/iiprofit-conestoga/CICD-lab2'
            }   script {
        }           // Clean up any previous node_modules
                    sh 'rm -rf node_modules'
        stage('Build & Test') {ackage-lock.json'
            steps { // Install dependencies using npm ci for consistency
                script {
                    // Clean up any previous node_modules
                    sh 'rm -rf node_modules'
                    sh 'rm -f package-lock.json'
                    // Install dependencies using npm ci for consistency
                    
                    sh 'npm install'
                    // Run tests
                    sh 'npm test'
                } {
            }   script {
        }           echo 'Building Docker image...'
                    // Build Docker image
        stage('Deploy') {ocker build -t iiprofit/cicd-lab:latest .'
            steps {
                script { 'Pushing Docker image to Docker Hub...'
                    echo 'Building Docker image...'Hub using Jenkins credentials
                    // Build Docker imagenamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker build -t iiprofit/cicd-lab:latest .'
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    echo 'Pushing Docker image to Docker Hub...'
                    // Push Docker image to Docker Hub using Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push iiprofit/cicd-lab:latest
                        '''dentials([sshUserPrivateKey(credentialsId: 'server-ssh-credentials', keyFileVariable: 'SSH_KEY')]) {
                    }   sh '''
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no user_profit@185.239.208.33 "
                    echo 'Deploying Docker container...'b:latest &&
                    // Deploy Docker container to the server
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-ssh-credentials', keyFileVariable: 'SSH_KEY')]) {
                        sh '''cker run -d --name cicd-lab -p 3000:3000 iiprofit/cicd-lab:latest
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no user_profit@185.239.208.33 "
                            docker pull iiprofit/cicd-lab:latest &&
                            docker stop cicd-lab || true &&
                            docker rm cicd-lab || true &&
                            docker run -d --name cicd-lab -p 3000:3000 iiprofit/cicd-lab:latest
                        "
                        '''
                    }
                }
            }s {
        }   echo 'Pipeline execution finished.'
    }   }
        success {
    post {  echo 'The pipeline executed successfully!'
        always {
            echo 'Pipeline execution finished.'
        }   echo 'The pipeline failed.'
        success {
            echo 'The pipeline executed successfully!'
        }        failure {            echo 'The pipeline failed.'        }    }}