module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        // existing configs...
        "fs": false,
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),     
        'stream': require.resolve('stream-browserify'),
        'buffer': require.resolve('buffer/'),
        'util': require.resolve('util/'),
        'assert': require.resolve('assert/')      
   }
    
    return config
}