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
                echo 'Deploying the application...'
                // Add your deployment commands here
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