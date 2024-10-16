#!/bin/bash
DSERVER=codemarc@codemarc.net
DFOLDER=codemarc.net/web
echo "Deploying to $DSERVER"
ssh $DSERVER cd $DFOLDER && mkdir -p apps/
scp -r apps/* $DSERVER:$DFOLDER/apps/
