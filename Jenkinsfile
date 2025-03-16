pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'cicd', url: 'https://github.com/iiprofit-conestoga/CICD-lab2'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test' // Ensure you have a test script in package.json
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment steps here
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}