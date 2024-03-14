create table
    userdetailes (
        userid serial primary key,
        username varchar(250) not null,
        email varchar(250) not null,
        password varchar(250) not null,
        profile varchar(250) not null,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

create table
    tasks (
        taskid serial primary key,
        taskname varchar(250) not null,
        category varchar(250) not null,
        priority varchar(250) not null,
        description varchar(850) not null,
        deadline varchar(250) not null,
        status varchar(250),
        userid int not null,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userid) REFERENCES userdetailes (userid)
    )
    INSERT INTO tasks (taskname, category, priority, description, deadline, status,userid) VALUES
('Complete Report Presentation', 'Work', 'High', 'Complete project report', '2024-03-01', 'In Progress',2),
('Code Refactoring for Module X', 'Personal', 'Medium', 'Buy groceries', '2024-02-20', 'To Do',2),
('Client Meeting Preparation', 'Work', 'Low', 'Schedule meeting with team', '2024-02-25', 'Complted',2),
('Update User Documentation', 'Personal', 'High', 'Book flight tickets for vacation', '2024-03-10', 'To Do',2),
('Test Automation Implementation', 'Work', 'Medium', 'Review code changes', '2024-02-28', 'In Progress',1),
('Design Mockups for New Feature', 'Personal', 'Low', 'Exercise for 30 minutes', '2024-02-22', 'To Do',2),
('Server Maintenance Check', 'Work', 'High', 'Prepare presentation for client meeting', '2024-03-05', 'To Do',2),
('Data Analysis for Quarterly Report', 'Personal', 'Medium', 'Read a book', '2024-02-26', 'To Do',1),
('Sprint Review Meeting', 'Work', 'Low', 'Update project documentation', '2024-03-15', 'To Do',2),
('Bug Fixing in Production', 'Personal', 'High', 'Plan weekend getaway', '2024-03-03', 'To Do',1),
('UX/UI Enhancement for Dashboard', 'Work', 'Medium', 'Resolve customer support tickets', '2024-02-23', 'To Do',2),
('Team Building Activity Planning', 'Personal', 'Low', 'Learn a new recipe', '2024-03-08', 'To Do',2),
('Create Training Materials', 'Work', 'High', 'Code review with the team', '2024-02-27', 'To Do',1),
('Security Audit for Application', 'Personal', 'Medium', 'Organize closet', '2024-03-12', 'Complted',1),
('Social Media Campaign Launch', 'Work', 'Low', 'Test new software release', '2024-03-20', 'To Do',2),
('Onboarding Session for New Hires', 'Personal', 'High', 'Write blog post', '2024-03-07', 'Complted',2),
('Database Optimization', 'Work', 'Medium', 'Create project timeline', '2024-02-29', 'To Do',1),
('Content Creation for Blog', 'Personal', 'Low', 'Practice a musical instrument', '2024-03-18', 'To Do',1),
('Mobile App Testing', 'Work', 'High', 'Conduct team training session', '2024-03-14', 'Complted',1),
('Customer Support Training', 'Personal', 'Medium', 'Attend yoga class', '2024-03-02', 'To Do',2),
('Research on Emerging Technologies', 'Work', 'Low', 'Update client on project status', '2024-03-09', 'To Do',2),
('Infrastructure Scaling Plan', 'Personal', 'High', 'Visit the dentist', '2024-03-06', 'Complted',2),
('Annual Budget Review', 'Work', 'Medium', 'Implement new feature', '2024-02-24', 'To Do',2),
('Video Tutorial Recording', 'Personal', 'Low', 'Watch a documentary', '2024-03-11', 'To Do',2),
('Website Redesign Planning', 'Work', 'High', 'Prepare for quarterly review', '2024-03-13', 'To Do',2),
('Code Review Session', 'Personal', 'Medium', 'Take a photography class', '2024-03-16', 'To Do',2),
('Marketing Strategy Brainstorming', 'Work', 'Low', 'Test server backups', '2024-03-19', 'To Do',2),
('Data Backup and Recovery Test', 'Personal', 'High', 'Create a budget plan', '2024-03-04', 'To Do',2),
('Project Kickoff Meeting', 'Work', 'Medium', 'Optimize database performance', '2024-03-17', 'To Do',2),
('Employee Performance Evaluations', 'Personal', 'Low', 'Write thank-you notes', '2024-03-21', 'Completed',2);




SELECT u.username,
u.userid,
t.taskname, t.category, t.priority, t.description, t.deadline, t.status
 FROM userdetailes u join tasks t on u.userid=t.userid WHERE u.email = 'omkar111@gmail.com';
 drop table tasks


 SELECT COUNT(*)
FROM tasks t
JOIN userdetailes u ON t.userid = u.userid
WHERE t.status = 'To Do' AND u.token = 'cIEsGKjz24'