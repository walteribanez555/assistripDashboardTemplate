# Use the official Nginx image as a base image
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled Angular app into the Nginx web root directory
COPY dist/* /usr/share/nginx/html/

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
