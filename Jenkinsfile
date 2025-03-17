pipeline {
    agent {
        docker { image 'node:18' }  // This runs the entire pipeline inside the Node.js 18 container
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/iiprofit-conestoga/CICD-lab2'
            }
        }
        
        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
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
    }
}