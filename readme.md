# Graphite Stacking Demo

Demonstrating **stacked PRs** with [Graphite CLI](https://graphite.dev/).

## Traditional vs Graphite

**Traditional:** Wait for each PR to merge before starting the next.

```
feature-1 ──► wait... ──► merged ──► feature-2 ──► wait... ──► feature-3
```

**Graphite:** Work on dependent features in parallel.

```
main
 ├── feature-1 (Posts Data)
 └── feature-2 (Post List)
      └── feature-3 (Post Details)
```

## Quick Commands

```bash
gt create feature-1 -m "Add posts data"        # branch off main
gt checkout main
gt create feature-2 -m "Add post list"         # branch off main
gt create feature-3 -m "Add post details"      # stacks on feature-2

gt log                                          # view the stack
gt submit --stack                               # submit all PRs
gt sync                                         # auto-rebase after merges
```
