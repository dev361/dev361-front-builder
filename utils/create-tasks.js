
// Function to create gulp tasks based on the tasks/ directory content

module.exports = function(plugins, config){
    plugins.fs.readdirSync('./tasks/')
        .map(
            function (taskname) {
                return taskname.substr(0, taskname.length - 3);
            }
        )
        .forEach(function (taskname) {
            return plugins.gulp.task(taskname, [], function () {
                require('./../tasks/' + taskname)(plugins, config);
            });
        });
}