# Dockerfile --  Es un entorno de web ligero
FROM httpd:alpine

# Configurar el ServerName para evitar advertencias
# Es una adventencia generado por Apache cuando no puede determinar el nombre de dominio completo del servidor 
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# COPY ./  ---> Con esto bastaba, pero decidi hacerlo asi, a parte
#               si o si se tiene que llamar index.html, sino hay que
#               configurarlo manualmente con que .html iniciar
COPY ./pages /usr/local/apache2/htdocs/
COPY ./assets /usr/local/apache2/htdocs/assets/

EXPOSE 80
