pipeline {
    agent {
        docker { 
            image 'node:18'
            args '--user=root'  // Ensures that the Docker container uses the Jenkins user (for permission consistency)
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/iiprofit-conestoga/CICD-lab2'
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    // Clean up any previous node_modules
                    sh 'rm -rf node_modules'
                    sh 'rm -f package-lock.json'
                    // Install dependencies using npm ci for consistency
                    
                    sh 'npm install'
                    // Run tests
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Building Docker image...'
                    // Build Docker image
                    sh 'docker build -t iiprofit/cicd-lab:latest .'

                    echo 'Pushing Docker image to Docker Hub...'
                    // Push Docker image to Docker Hub using Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push iiprofit/cicd-lab:latest
                        '''
                    }

                    echo 'Deploying Docker container...'
                    // Deploy Docker container to the server
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-ssh-credentials', keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no user_iiprofit@185.239.208.33 "
                            docker pull iiprofit/cicd-lab:latest &&
                            docker stop cicd-lab || true &&
                            docker rm cicd-lab || true &&
                            docker run -d --name cicd-lab -p 3000:3000 iiprofit/cicd-lab:latest
                        "
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'The pipeline executed successfully!'
        }
        failure {
            echo 'The pipeline failed.'
        }
    }
}